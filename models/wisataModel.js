import cloudinary from "../config/cloudinary.js";
import sections from "./mongoContentModel/sections.js";

export async function getWisataContents() {
  try {
    const wisata = await sections.find().findOne({ idSection: 9 }).lean();

    if (!wisata) {
      throw new Error("Section Wisata tidak ditemukan");
    }

    return wisata;
  } catch (error) {
    console.error("Error getting wisata contents:", error);
    throw error;
  }
}

export async function uploadImageWisataSection(id_section, wisataTitle, file) {
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
          "wisata.$[item].image.url": image_url,
        },
      },
      {
        arrayFilters: [{ "item.title": wisataTitle }],
      },
    );

    if (result.matchedCount === 0) {
      throw new Error("Section tidak ditemukan");
    }

    return {
      success: true,
      image_url,
      message: "Image wisata berhasil diupdate",
    };
  } catch (error) {
    console.error("Error uploading image wisata section:", error);
    throw error;
  }
}
