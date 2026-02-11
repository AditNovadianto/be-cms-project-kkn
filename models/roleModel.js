import { db } from "../config/db.js";

export async function getAllRoles() {
  try {
    const [rows] = await db.query(`SELECT * FROM roles`);

    return rows;
  } catch (error) {
    console.error("Error getting all roles:", error);
    throw error;
  }
}
