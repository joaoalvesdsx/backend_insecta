import { UserController } from "../controllers/userController";
import { Router } from "express";
import { authenticateJWT } from "../middlewares/authMiddleware";

const router = Router();
const userController = new UserController();

// Rota para criar um usuário (não requer autenticação)
router.post("/users", userController.create);

// Rota para buscar todos os usuários (não requer autenticação)
router.get("/users", userController.getAll);

// Rota para buscar um usuário pelo ID (não requer autenticação, mas pode ser alterado se necessário)
router.get("/users/:user_id", (req, res) => {
  userController.getById(req, res);
});

// Rota para atualizar um usuário (requere autenticação)
router.put("/users_update/:user_id", authenticateJWT, (req, res) => {
  userController.update(req, res);
});

// Rota para atualizar o tipo de um usuário (requere autenticação)
router.put("/users/:user_id/tipo", authenticateJWT, (req, res) => {
  userController.updateTipo(req, res);
});

// Rota para atualizar a senha de um usuário (requere autenticação)
router.put("/users/:user_id/senha", authenticateJWT, (req, res) => {
  userController.updateSenha(req, res);
});

router.delete("/user_delete/:user_id", authenticateJWT, (req, res) => {
  userController.deleteById(req, res); // Executa a função que deleta o usuário
});

export default router;
