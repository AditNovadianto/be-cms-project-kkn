import * as saranaPrasaranaModel from "../models/saranaPrasaranaModel.js";

export const getSaranaPrasaranaContents = async (req, res) => {
  try {
    const result = await saranaPrasaranaModel.getSaranaPrasaranaContents();

    return res.status(200).json(result);
  } catch (error) {
    console.error("getSaranaPrasaranaContents error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const uploadImageSaranaPrasaranaSection = async (req, res) => {
  try {
    const { id_section } = req.params;
    const file = req.file;
    const { saranaPrasaranaTitle } = req.body;

    if (!file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const result = await saranaPrasaranaModel.uploadImageSaranaPrasaranaSection(
      id_section,
      saranaPrasaranaTitle,
      file,
    );

    return res.status(200).json(result);
  } catch (err) {
    console.error("uploadImageSaranaPrasaranaSection error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
