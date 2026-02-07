import * as petaWilayahModel from "../models/petaWilayahModel.js";

export const getPetaWilayahContents = async (req, res) => {
  try {
    const result = await petaWilayah.getPetaWilayahContents();

    return res.status(200).json(result);
  } catch (error) {
    console.error("getPetaWilayahContents error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
