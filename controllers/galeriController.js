import * as galeriModel from "../models/galeriModel.js";

export const getGalleryContents = async (req, res) => {
  try {
    const result = await galeriModel.getGalleryContents();

    return res.status(200).json(result);
  } catch (error) {
    console.error("getGalleryContents error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const uploadGalleryImageSection = async (req, res) => {
  try {
    const { id_section } = req.params;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const result = await galeriModel.uploadGalleryImageSection(
      id_section,
      file,
      req.body.altText || "Gallery image",
    );

    return res.status(200).json(result);
  } catch (err) {
    console.error("uploadGalleryImageSection error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
