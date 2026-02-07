import sections from "./mongoContentModel/sections.js";

export async function getBatasWilayahContents() {
  try {
    const batasWilayah = await sections.find().findOne({ idSection: 5 }).lean();

    if (!batasWilayah) {
      throw new Error("Section Batas Wilayah tidak ditemukan");
    }

    return batasWilayah;
  } catch (error) {
    console.error("Error getting batas wilayah contents:", error);
    throw error;
  }
}
