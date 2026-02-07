import sections from "./mongoContentModel/sections.js";

export async function getBerandaContents() {
  try {
    const beranda = await sections.find().findOne({ idSection: 1 }).lean();

    if (!beranda) {
      throw new Error("Section Beranda tidak ditemukan");
    }

    return beranda;
  } catch (error) {
    console.error("Error getting beranda contents:", error);
    throw error;
  }
}
