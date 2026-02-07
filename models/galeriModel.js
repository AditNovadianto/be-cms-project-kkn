import cloudinary from "../config/cloudinary.js";
import sections from "./mongoContentModel/sections.js";

export async function getGalleryContents() {
  try {
    const galeri = await sections.find().findOne({ idSection: 11 }).lean();

    if (!galeri) {
      throw new Error("Section Galeri tidak ditemukan");
    }

    return galeri;
  } catch (error) {
    console.error("Error getting gallery contents:", error);
    throw error;
  }
}

export async function uploadGalleryImageSection(id_section, file, altText) {
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

    await sections.updateOne(
      { idSection: String(id_section) },
      {
        $push: {
          gallery: {
            url: image_url,
            alt: altText,
          },
        },
      },
    );

    return {
      success: true,
      image_url,
      message: "Gallery image uploaded successfully",
    };
  } catch (error) {
    console.error("Error uploading gallery image section:", error);
    throw error;
  }
}