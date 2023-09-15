import { NextFunction, Request, Response } from "express";

export function catchError(_req: Request, res: Response, next: NextFunction) {
  try {
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred. Check server logs.");
  }
}
