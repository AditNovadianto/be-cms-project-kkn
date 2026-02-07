import sections from "./mongoContentModel/sections.js";

export async function getPemerintahanContents() {
  try {
    const pemerintahan = await sections.find().findOne({ idSection: 6 }).lean();

    if (!pemerintahan) {
      throw new Error("Section Pemerintahan tidak ditemukan");
    }

    return pemerintahan;
  } catch (error) {
    console.error("Error getting pemerintahan contents:", error);
    throw error;
  }
}
