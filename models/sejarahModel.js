import sections from "./mongoContentModel/sections.js";

export async function getSejarahContents() {
  try {
    const sejarah = await sections.find().findOne({ idSection: 8 }).lean();

    if (!sejarah) {
      throw new Error("Section Sejarah tidak ditemukan");
    }

    return sejarah;
  } catch (error) {
    console.error("Error getting sejarah contents:", error);
    throw error;
  }
}
