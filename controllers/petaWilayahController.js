import * as petaWilayahModel from "../models/petaWilayahModel.js";

export const getPetaWilayahContents = async (req, res) => {
  try {
    const result = await petaWilayahModel.getPetaWilayahContents();

    return res.status(200).json(result);
  } catch (error) {
    console.error("getPetaWilayahContents error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
