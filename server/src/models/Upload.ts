// server/src/models/Upload.ts
import { Schema, model, Document, Types } from "mongoose";
import { IUser } from "./user";

export interface IUpload extends Document {
  title: string;
  description?: string;
  type: "painting" | "photograph";
  fileKey: string; // original size
  sizes?: {
    thumbnail?: string;
    medium?: string;
  };
  owner: Types.ObjectId | IUser; // either ObjectId or populated User
  createdAt: Date;
}

const uploadSchema = new Schema<IUpload>({
  title: { type: String, required: true },
  description: String,
  type: { type: String, enum: ["painting", "photograph"], required: true },
  fileKey: { type: String, required: true }, // original size
  sizes: {
    thumbnail: String,
    medium: String,
  },
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

export default model<IUpload>("Upload", uploadSchema);