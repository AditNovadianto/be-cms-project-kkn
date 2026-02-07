import * as potensiModel from "../models/potensiModel.js";

export const getPotensiContents = async (req, res) => {
  try {
    const result = await potensiModel.getPotensiContents();

    return res.status(200).json(result);
  } catch (error) {
    console.error("getPotensiContents error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
