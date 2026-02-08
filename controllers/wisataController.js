import * as wisataModel from "../models/wisataModel.js";

export const getWisataContents = async (req, res) => {
  try {
    const result = await wisataModel.getWisataContents();

    return res.status(200).json(result);
  } catch (error) {
    console.error("getWisataContents error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const uploadImageWisataSection = async (req, res) => {
  try {
    const { id_section } = req.params;
    const file = req.file;
    const { wisataTitle } = req.body;

    if (!file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const result = await wisataModel.uploadImageWisataSection(
      id_section,
      wisataTitle,
      file,
    );

    return res.status(200).json(result);
  } catch (err) {
    console.error("uploadImageWisataSection error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
