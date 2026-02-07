import { db } from "../config/db.js";
import cloudinary from "../config/cloudinary.js";
import sections from "./mongoContentModel/sections.js";

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

// Sarana dan Prasarana

//

// Galeri

//

// for Beranda, Peta Wilayah, Pemerintahan
export async function uploadHeroImageSection(id_section, file) {
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
        $set: {
          "heroImage.url": image_url,
        },
      },
    );

    return { success: true, image_url, message: "Image uploaded successfully" };
  } catch (error) {
    console.error("Error uploading hero image section:", error);
    throw error;
  }
}
//

// for all sections
export async function updateSection(id_section, content) {
  try {
    if (id_section === String(1)) {
      await sections.updateOne(
        { idSection: String(id_section) },
        {
          $set: {
            title: content.title,
            subtitle: content.subtitle,
            tagline: content.tagline,
            description: content.description,
            updatedBy: content.updatedBy,
          },
        },
      );
    }

    if (id_section === String(2)) {
      await sections.updateOne(
        { idSection: String(id_section) },
        {
          $set: {
            jumlahPenduduk: content.jumlahPenduduk,
            lakiLaki: content.lakiLaki,
            perempuan: content.perempuan,
            kepalaKeluarga: content.kepalaKeluarga,
            updatedBy: content.updatedBy,
          },
        },
      );
    }

    if (id_section === String(3)) {
      await sections.updateOne(
        { idSection: String(id_section) },
        {
          $set: {
            description: content.description,
            luasWilayah: content.luasWilayah,
            polaPemukiman: content.polaPemukiman,
            jaringanJalan: content.jaringanJalan,
            kondisiWilayah: content.kondisiWilayah,
            skalaPeta: content.skalaPeta,
            updatedBy: content.updatedBy,
          },
        },
      );
    }

    if (id_section === String(4)) {
      await sections.updateOne(
        { idSection: String(id_section) },
        {
          $set: {
            visi: content.visi,
            misi: content.misi,
            updatedBy: content.updatedBy,
          },
        },
      );
    }

    if (id_section === String(5)) {
      await sections.updateOne(
        { idSection: String(id_section) },
        {
          $set: {
            batasUtara: content.batasUtara,
            batasSelatan: content.batasSelatan,
            batasTimur: content.batasTimur,
            batasBarat: content.batasBarat,
            updatedBy: content.updatedBy,
          },
        },
      );
    }

    if (id_section === String(6)) {
      await sections.updateOne(
        { idSection: String(id_section) },
        {
          $set: {
            kepalaDesa: content.kepalaDesa,
            sekretarisDesa: content.sekretarisDesa,
            item: content.item,
            updatedBy: content.updatedBy,
          },
        },
      );
    }

    if (id_section === String(7)) {
      await sections.updateOne(
        { idSection: String(id_section) },
        {
          $set: {
            potensi: content.potensi,
            updatedBy: content.updatedBy,
          },
        },
      );
    }

    if (id_section === String(8)) {
      await sections.updateOne(
        { idSection: String(id_section) },
        {
          $set: {
            timeline: content.timeline,
            updatedBy: content.updatedBy,
          },
        },
      );
    }

    if (id_section === "9") {
      await sections.updateOne(
        {
          idSection: String(id_section),
        },
        {
          $set: {
            description: content.description,
            wisata: content.wisata,
            updatedBy: content.updatedBy,
            link: content.link,
          },
        },
      );
    }

    if (id_section === "10") {
      await sections.updateOne(
        {
          idSection: String(id_section),
        },
        {
          $set: {
            description: content.description,
            saranaPrasarana: content.saranaPrasarana,
            updatedBy: content.updatedBy,
          },
        },
      );
    }

    if (id_section === "11") {
      await sections.updateOne(
        {
          idSection: String(id_section),
        },
        {
          $set: {
            gallery: content.gallery,
            updatedBy: content.updatedBy,
          },
        },
      );
    }

    const [insertRes] = await db.query(
      `UPDATE sections SET updated_at = NOW(), id_user = ? WHERE id_section = ?`,
      [content.updatedBy, id_section],
    );

    return { success: true, message: "Section updated successfully" };
  } catch (error) {
    console.error("Error updating section:", error);
    throw error;
  }
}
//
