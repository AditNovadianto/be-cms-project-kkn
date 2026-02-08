import * as visiMisiModel from "../models/visiMisiModel.js";

export const getVisiMisiContents = async (req, res) => {
  try {
    const result = await visiMisiModel.getVisiMisiContents();

    return res.status(200).json(result);
  } catch (error) {
    console.error("getVisiMisiContents error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
