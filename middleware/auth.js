import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
  // Ambil token dari header Authorization: "Bearer <token>"
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: "Token missing" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // akan throw jika expired/invalid

    req.user = decoded; // simpan payload ke request

    // 🛡️ Filter by role
    // Jika bukan admin, maka hanya izinkan GET (read)
    if (
      decoded.id_role !== 1 &&
      !(decoded.id_role === 2 && req.method === "GET")
    ) {
      return res.status(403).json({
        error: "Access denied",
      });
    }

    return next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired" });
    }

    return res.status(403).json({ error: "Invalid token" });
  }
}
