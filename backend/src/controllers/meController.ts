import { getAuth } from "@clerk/express";
import { getLocalUser } from "../lib/users";
import type { Request, Response, NextFunction } from "express";

export async function getMe(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId, isAuthenticated } = getAuth(req);
    if (!isAuthenticated || !userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const user = await getLocalUser(userId);

    res.json({ user });
  } catch (err) {
    next(err);
  }
}