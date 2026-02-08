import * as demografiModel from "../models/demografiModel.js";

export const getDemografiContents = async (req, res) => {
  try {
    const result = await demografiModel.getDemografiContents();

    return res.status(200).json(result);
  } catch (error) {
    console.error("getDemografiContents error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
