// services/authService.ts
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { userRepository } from "../repositories/UserRepository";

dotenv.config();

export async function authenticateUser(email: string, senha: string) {
  // Buscar o usuário no banco de dados
  const user = await userRepository.findOneBy({ email });

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  // Verificar a senha
  const isPasswordValid = senha === user.senha;

  if (!isPasswordValid) {
    throw new Error("Senha incorreta");
  }

  return user;
}

export function generateToken(user: any) {
  const payload = {
    user_id: user.user_id,
    role: user.tipo, // Adiciona a role aqui
  };

  const secret = process.env.JWT_SECRET as string;
  const options = { expiresIn: "1h" };

  return jwt.sign(payload, secret, options);
}
