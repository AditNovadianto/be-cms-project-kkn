import cloudinary from "../config/cloudinary.js";
import sections from "./mongoContentModel/sections.js";

export async function getSaranaPrasaranaContents() {
  try {
    const saranaPrasarana = await sections
      .find()
      .findOne({ idSection: 10 })
      .lean();

    if (!saranaPrasarana) {
      throw new Error("Section Sarana Prasarana tidak ditemukan");
    }

    return saranaPrasarana;
  } catch (error) {
    console.error("Error getting sarana prasarana contents:", error);
    throw error;
  }
}

export async function uploadImageSaranaPrasaranaSection(
  id_section,
  saranaPrasaranaTitle,
  file,
) {
  try {
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "images-allakuang-cms",
            resource_type: "image",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        )
        .end(file.buffer);
    });

    const image_url = uploadResult.secure_url;

    const result = await sections.updateOne(
      { idSection: String(id_section) },
      {
        $set: {
          "saranaPrasarana.$[item].image.url": image_url,
        },
      },
      {
        arrayFilters: [{ "item.title": saranaPrasaranaTitle }],
      },
    );

    if (result.matchedCount === 0) {
      throw new Error("Section tidak ditemukan");
    }

    return {
      success: true,
      image_url,
      message: "Image sarana prasarana berhasil diupdate",
    };
  } catch (error) {
    console.error("Error uploading image sarana prasarana section:", error);
    throw error;
  }
}
