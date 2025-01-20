import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UserPayload } from "../types/user";

dotenv.config();

export function authenticateJWT(
  req: Request & { user?: UserPayload }, // Adicionado tipo UserPayload ao req
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Token não fornecido ou mal formatado" });
    return;
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET não configurado nas variáveis de ambiente");
    }

    const decoded = jwt.verify(token, secret) as UserPayload;

    req.user = decoded; // Anexa o payload do usuário no objeto req

    next(); // Prossegue para o próximo middleware ou rota
  } catch (error) {
    res.status(403).json({
      message: "Token inválido ou expirado",
      error: error instanceof Error ? error.message : "Erro desconhecido",
    });
  }
}
