import { db } from "../config/db.js";
import cloudinary from "../config/cloudinary.js";
import berandaModel from "./mongoContentModel/berandaModel.js";

export async function uploadImageSection(id_section, file) {
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

    await berandaModel.updateOne(
      { idSection: String(id_section) },
      {
        $set: {
          "heroImage.url": image_url,
        },
      },
    );

    return { success: true, image_url, message: "Image uploaded successfully" };
  } catch (error) {
    throw error;
  }
}

export async function updateSection(id_section, content) {
  try {
    await berandaModel.updateOne(
      { idSection: String(id_section) },
      {
        $set: {
          title: content.title,
          subtitle: content.subtitle,
          tagline: content.tagline,
          description: content.description,
          isActive: content.isActive,
        },
      },
    );

    const [insertRes] = await db.query(
      `UPDATE sections SET updated_at = NOW() WHERE id_section = ?`,
      [id_section],
    );

    return { success: true, message: "Section updated successfully" };
  } catch (error) {
    console.error("Error updating section:", error);
    throw error;
  }
}
