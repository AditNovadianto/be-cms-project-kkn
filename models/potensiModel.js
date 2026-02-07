import sections from "./mongoContentModel/sections.js";

export async function getPotensiContents() {
  try {
    const potensi = await sections.find().findOne({ idSection: 7 }).lean();

    if (!potensi) {
      throw new Error("Section Potensi tidak ditemukan");
    }

    return potensi;
  } catch (error) {
    console.error("Error getting potensi contents:", error);
    throw error;
  }
}
