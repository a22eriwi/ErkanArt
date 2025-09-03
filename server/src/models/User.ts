// server/src/models/User.ts

import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    email: string;
    firstName: string;
    lastName: string;
    passwordHash: string;
    isApproved: boolean;
    role: "user" | "admin";
    createdAt: Date;
}

const UserSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    passwordHash: { type: String, required: true },
    isApproved: { type: Boolean, default: false },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IUser>("User", UserSchema);