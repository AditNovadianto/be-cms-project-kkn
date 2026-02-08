import * as batasWilayahModel from "../models/batasWilayahModel.js";

export const getBatasWilayahContents = async (req, res) => {
  try {
    const result = await batasWilayahModel.getBatasWilayahContents();

    return res.status(200).json(result);
  } catch (error) {
    console.error("getBatasWilayahContents error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
