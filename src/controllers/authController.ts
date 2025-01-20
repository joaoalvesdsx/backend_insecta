// controllers/authController.ts
import { Request, Response } from "express";
import { authenticateUser, generateToken } from "../services/authService";

export async function login(req: Request, res: Response) {
  const { email, senha } = req.body;
  console.log(email, senha);

  try {
    // Validação das credenciais do usuário
    const user = await authenticateUser(email, senha);

    // Gerar o token JWT
    if (user.user_id === undefined) {
      throw new Error("User ID is undefined");
    }
    const token = generateToken(user.user_id);

    // Retornar o token para o cliente
    res.json({ message: "Login bem-sucedido", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao fazer login" });
  }
}
