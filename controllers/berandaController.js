import * as berandaModel from "../models/berandaModel.js";

export const getBerandaContents = async (req, res) => {
  try {
    const result = await berandaModel.getBerandaContents();

    return res.status(200).json(result);
  } catch (error) {
    console.error("getBerandaContents error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
