import { db } from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { transporter } from "../utils/mailer.js";

const signToken = (user) => {
  if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is not set");
  return jwt.sign(
    { sub: user.id_user, nama_user: user.nama_user, id_role: user.id_role },
    process.env.JWT_SECRET,
    {
      expiresIn: "15min",
      issuer: "my-app",
      audience: "my-app-users",
      algorithm: "HS256",
    },
  );
};

const sanitizeUser = (u) => ({
  id_user: u.id_user,
  nama_user: u.nama_user,
  email_user: u.email_user,
  id_landingpage: u.id_landingpage,
  id_role: u.id_role,
});

// --- SIGN UP ---
export const signUp = async (req, res) => {
  const { nama_user, email_user, password_user, id_landingpage, id_role } =
    req.body;

  try {
    // 1) cek user sudah ada?
    const [existRows] = await db.query(
      "SELECT id_user FROM users WHERE email_user = ? LIMIT 1",
      [email_user],
    );

    if (existRows.length > 0) {
      return res.status(409).json({ error: "User already exists" });
    }

    // 2) hash password
    const hashed = await bcrypt.hash(password_user, 10);

    // 3) insert user
    const [insertRes] = await db.query(
      "INSERT INTO users (nama_user, email_user, password_user, id_landingpage, id_role) VALUES (?, ?, ?, ?, ?)",
      [nama_user, email_user, hashed, id_landingpage, id_role],
    );

    // 4) ambil user baru
    const [newUserRows] = await db.query(
      "SELECT id_user, nama_user, email_user, id_landingpage, id_role FROM users WHERE id_user = ?",
      [insertRes.insertId],
    );

    const newUser = newUserRows[0];

    // 5) buat token
    const token = signToken(newUser);

    return res.status(201).json({ user: sanitizeUser(newUser), token });
  } catch (err) {
    console.error("signUp error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// --- SIGN IN ---
export const signIn = async (req, res) => {
  const { email_user, password_user } = req.body;

  try {
    // 1) ambil user
    const [rows] = await db.query(
      "SELECT id_user, nama_user, email_user, password_user, id_landingpage, id_role FROM users WHERE email_user = ? LIMIT 1",
      [email_user],
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = rows[0];

    // 2) verifikasi password
    const ok = await bcrypt.compare(password_user, user.password_user);

    if (!ok) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // 3) buat token
    const token = signToken(user);

    return res.status(200).json({ user: sanitizeUser(user), token });
  } catch (err) {
    console.error("signIn error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id_user, nama_user, email_user, id_landingpage, id_role FROM users",
    );

    return res.status(200).json({ users: rows });
  } catch (err) {
    console.error("getAllUsers error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const forgotPassword = async (req, res) => {
  const { email_user } = req.body;

  try {
    const [users] = await db.query("SELECT * FROM users WHERE email_user = ?", [
      email_user,
    ]);

    if (users.length === 0) {
      return res.status(404).json({ message: "Email tidak ditemukan" });
    }

    const user = users[0];

    // generate token (expire 15 menit)
    const token = jwt.sign({ id_user: user.id_user }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;

    // kirim email
    await transporter.sendMail({
      from: `"CMS Allakuang" <${process.env.EMAIL_USER}>`,
      to: email_user,
      subject: "Reset Password",
      html: `
        <p>Halo ${user.nama_user},</p>
        <p>Klik link di bawah untuk reset password:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>Link ini berlaku 15 menit.</p>
      `,
    });

    res.json({ message: "Link reset berhasil dikirim" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    // verifikasi token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // update password di database
    await db.query("UPDATE users SET password_user = ? WHERE id_user = ?", [
      hashedPassword,
      decoded.id_user,
    ]);

    res.json({ message: "Password berhasil direset" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Token tidak valid atau expired" });
  }
};
