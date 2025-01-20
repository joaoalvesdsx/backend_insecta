import { Router } from "express";
import { UserController } from "../controllers/UserController";

const router = Router();
const userController = new UserController();

// Rota para criar um usuário
router.post("/users", userController.create);

// Rota para buscar todos os usuários
router.get("/users", userController.getAll);

// Rota para buscar um usuário pelo ID
router.get("/users/:user_id", (req, res) => {
  const userId = parseInt(req.params.user_id, 10); // Garantir que o user_id é um número
  userController.getById(req, res);
});

export default router;
