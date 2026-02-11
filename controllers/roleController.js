import * as roleModel from "../models/roleModel.js";

export const getAllRoles = async (req, res) => {
  try {
    const result = await roleModel.getAllRoles();

    return res.status(200).json(result);
  } catch (error) {
    console.error("getAllRoles error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
