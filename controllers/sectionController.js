import * as sectionModel from "../models/sectionModel.js";

// Beranda

//

// Demografi

//

// Peta Wilayah

//

// Visi dan Misi

//

// Batas Wilayah

//

// Pemerintahan

//

// Potensi

//

// Sejarah

//

// Wisata

//

// Sarana Prasarana

//

// Galeri

//

// for Beranda, Peta Wilayah, Pemerintahan
export const uploadHeroImageSection = async (req, res) => {
  try {
    const { id_section } = req.params;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const result = await sectionModel.uploadHeroImageSection(id_section, file);

    return res.status(200).json(result);
  } catch (err) {
    console.error("uploadHeroImageSection error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
//

// for all sections
export const updateSection = async (req, res) => {
  try {
    const { id_section } = req.params;
    const content = req.body;

    const result = await sectionModel.updateSection(id_section, content);

    return res.status(200).json(result);
  } catch (err) {
    console.error("updateSection error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
//
