import sections from "./mongoContentModel/sections.js";

export async function getVisiMisiContents() {
  try {
    const visiMisi = await sections.find().findOne({ idSection: 4 }).lean();

    if (!visiMisi) {
      throw new Error("Section Visi Misi tidak ditemukan");
    }

    return visiMisi;
  } catch (error) {
    console.error("Error getting visi misi contents:", error);
    throw error;
  }
}
