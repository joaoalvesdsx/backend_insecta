import { Request, Response } from "express";
import {
  createComentario,
  deleteComentario,
  findAllComentarios,
  findComentarioById,
  updateComentario,
} from "../repositories/ComentarioRepository";

export class ComentarioController {
  // Criar um novo comentário
  async create(req: Request, res: Response) {
    const comentarioData = req.body;

    try {
      const newComentario = await createComentario(comentarioData);
      res.status(201).json(newComentario);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao criar o comentário." });
    }
  }

  // Buscar todos os comentários
  async getAll(req: Request, res: Response) {
    try {
      const comentarios = await findAllComentarios();
      res.json(comentarios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao buscar os comentários." });
    }
  }

  // Buscar um comentário pelo ID
  async getById(req: Request, res: Response) {
    const comentarioId = parseInt(req.params.comentario_id);

    try {
      const comentario = await findComentarioById(comentarioId);
      if (!comentario) {
        return res.status(404).json({ message: "Comentário não encontrado." });
      }
      res.json(comentario);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao buscar o comentário." });
    }
  }

  // Atualizar um comentário
  async update(req: Request, res: Response) {
    const comentarioId = parseInt(req.params.comentario_id);
    const comentarioData = req.body;

    try {
      const updatedComentario = await updateComentario(
        comentarioId,
        comentarioData
      );
      if (!updatedComentario) {
        return res
          .status(404)
          .json({ message: "Comentário não encontrado para atualizar." });
      }
      res.json(updatedComentario);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao atualizar o comentário." });
    }
  }

  // Deletar um comentário pelo ID
  async deleteById(req: Request, res: Response) {
    const comentarioId = parseInt(req.params.comentario_id);

    try {
      const comentario = await findComentarioById(comentarioId);
      if (!comentario) {
        return res
          .status(404)
          .json({ message: "Comentário não encontrado para deletar." });
      }
      await deleteComentario(comentarioId);
      res.json({ message: "Comentário deletado com sucesso.", comentario });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao deletar o comentário." });
    }
  }
}
