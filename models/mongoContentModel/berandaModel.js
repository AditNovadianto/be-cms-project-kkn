import mongoose from "mongoose";

const berandaSchema = new mongoose.Schema(
  {
    idSection: {
      type: String,
      required: true,
      unique: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    subtitle: {
      type: String,
      trim: true,
    },

    tagline: {
      type: String,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    heroImage: {
      url: {
        type: String,
        required: true,
      },
      alt: {
        type: String,
        default: "",
      },
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Section", berandaSchema);
