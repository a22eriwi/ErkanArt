// server/src/middleware/authOptional.ts
import jwt from "jsonwebtoken";
import User from "../models/user";
import type { NextFunction, Response } from "express";
import type { AuthRequest } from "./auth";

export async function requireAuthOptional(req: AuthRequest, _res: Response, next: NextFunction) {
  const token =
    req.cookies?.accessToken || req.headers.authorization?.split(" ")[1];
  if (!token) return next(); // guest -> skip

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET!) as { id: string };
    const user = await User.findById(decoded.id);
    if (user) req.user = user;
  } catch {
    // invalid token -> continue as guest
  }
  next();
}