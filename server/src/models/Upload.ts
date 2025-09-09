// server/src/models/Upload.ts

import { Schema, model } from "mongoose";

const uploadSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  type: { type: String, enum: ["painting", "photograph"], required: true },
  fileKey: { type: String, required: true }, // R2 key
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

export default model("Upload", uploadSchema);