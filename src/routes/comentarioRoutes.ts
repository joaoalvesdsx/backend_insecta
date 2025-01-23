import { ComentarioController } from "../controllers/comentarioController";
import { Router } from "express";
import { authenticateJWT } from "../middlewares/authMiddleware";

const router = Router();
const commentController = new ComentarioController();

// Rota para criar um comentário (requere autenticação)
router.post("/comments", authenticateJWT, (req, res) => {
  commentController.create(req, res);
});

// Rota para buscar todos os comentários (não requer autenticação)
router.get("/comments", (req, res) => {
  commentController.getAll(req, res);
});

// Rota para buscar um comentário pelo ID (não requer autenticação)
router.get("/comments/:comment_id", (req, res) => {
  commentController.getById(req, res);
});

// Rota para atualizar um comentário (requere autenticação)
router.put("/comments/:comment_id", authenticateJWT, (req, res) => {
  commentController.update(req, res);
});

// Rota para deletar um comentário pelo ID (requere autenticação)
router.delete("/comments/:comment_id", authenticateJWT, (req, res) => {
  commentController.deleteById(req, res);
});

export default router;
