import * as batasWilayahModel from "../models/batasWilayahModel.js";

export const getBatasWilayahContents = async (req, res) => {
  try {
    const result = await batasWilayah.getBatasWilayahContents();

    return res.status(200).json(result);
  } catch (error) {
    console.error("getBatasWilayahContents error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
