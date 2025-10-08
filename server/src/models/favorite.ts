// server/src/models/favorite.ts
import { Schema, model, Document, Types } from "mongoose";

export interface IFavorite extends Document {
  user: Types.ObjectId;
  upload: Types.ObjectId;
}

const favoriteSchema = new Schema<IFavorite>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  upload: { type: Schema.Types.ObjectId, ref: "Upload", required: true },
});

// Optional: ensure one favorite per user per upload
favoriteSchema.index({ user: 1, upload: 1 }, { unique: true });

export default model<IFavorite>("Favorite", favoriteSchema);