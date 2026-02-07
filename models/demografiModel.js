import sections from "./mongoContentModel/sections.js";

export async function getDemografiContents() {
  try {
    const demografi = await sections.find().findOne({ idSection: 2 }).lean();

    if (!demografi) {
      throw new Error("Section Demografi tidak ditemukan");
    }

    return demografi;
  } catch (error) {
    console.error("Error getting demografi contents:", error);
    throw error;
  }
}
