import * as sejarahModel from "../models/sejarahModel.js";

export const getSejarahContents = async (req, res) => {
  try {
    const result = await sejarahModel.getSejarahContents();

    return res.status(200).json(result);
  } catch (error) {
    console.error("getSejarahContents error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
