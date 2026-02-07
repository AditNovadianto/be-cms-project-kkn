import sections from "./mongoContentModel/sections.js";

export async function getPetaWilayahContents() {
  try {
    const petaWilayah = await sections.find().findOne({ idSection: 3 }).lean();

    if (!petaWilayah) {
      throw new Error("Section Peta Wilayah tidak ditemukan");
    }

    return petaWilayah;
  } catch (error) {
    console.error("Error getting peta wilayah contents:", error);
    throw error;
  }
}
