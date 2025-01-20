import { Request, Response } from "express";
import {
  createUser,
  findAllUsers,
  findUserById,
} from "../repositories/UserRepository";

export class UserController {
  // Criar um novo usuário
  async create(req: Request, res: Response) {
    const userData = req.body;
    console.log(userData);
    try {
      const newUser = await createUser(userData);
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao criar o usuário." });
    }
  }

  // Buscar todos os usuários
  async getAll(req: Request, res: Response) {
    try {
      const users = await findAllUsers();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao buscar os usuários." });
    }
  }

  // Buscar um usuário pelo ID
  async getById(req: Request, res: Response) {
    const userId = parseInt(req.params.user_id); // Obtendo o user_id da rota

    try {
      const user = await findUserById(userId);

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }

      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao buscar o usuário." });
    }
  }
}
