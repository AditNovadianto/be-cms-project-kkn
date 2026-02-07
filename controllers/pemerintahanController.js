import * as pemerintahanModel from "../models/pemerintahanModel.js";

export const getPemerintahanContents = async (req, res) => {
  try {
    const result = await pemerintahanModel.getPemerintahanContents();

    return res.status(200).json(result);
  } catch (error) {
    console.error("getPemerintahanContents error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
