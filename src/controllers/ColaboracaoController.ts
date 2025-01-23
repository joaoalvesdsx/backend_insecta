import { Request, Response } from "express";
import {
  createColaboracao,
  deleteColaboracao,
  findAllColaboracoes,
  findColaboracaoById,
  updateColaboracao,
  findColaboracoesByEspecie,
  findColaboracaoByUserId,
} from "../repositories/ColaboracaoRepository";

export class ColaboracaoController {
  // Criar uma nova colaboração
  async create(req: Request, res: Response) {
    const colaboracaoData = req.body;

    try {
      const newColaboracao = await createColaboracao(colaboracaoData);
      res.status(201).json(newColaboracao);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao criar a colaboração." });
    }
  }

  // Buscar todas as colaborações
  async getAll(req: Request, res: Response) {
    try {
      const colaboracoes = await findAllColaboracoes();
      res.json(colaboracoes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao buscar as colaborações." });
    }
  }

  // Buscar uma colaboração pelo ID
  async getById(req: Request, res: Response) {
    const colaboracaoId = parseInt(req.params.colaboracao_id);

    try {
      const colaboracao = await findColaboracaoById(colaboracaoId);
      if (!colaboracao) {
        return res.status(404).json({ message: "Colaboração não encontrada." });
      }
      res.json(colaboracao);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao buscar a colaboração." });
    }
  }

  // Atualizar uma colaboração
  async update(req: Request, res: Response) {
    const colaboracaoId = parseInt(req.params.colaboracao_id);
    const colaboracaoData = req.body;

    try {
      const updatedColaboracao = await updateColaboracao(
        colaboracaoId,
        colaboracaoData
      );
      if (!updatedColaboracao) {
        return res
          .status(404)
          .json({ message: "Colaboração não encontrada para atualizar." });
      }
      res.json(updatedColaboracao);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao atualizar a colaboração." });
    }
  }

  // Deletar uma colaboração pelo ID
  async deleteById(req: Request, res: Response) {
    const colaboracaoId = parseInt(req.params.colaboracao_id);

    try {
      const colaboracao = await findColaboracaoById(colaboracaoId);
      if (!colaboracao) {
        return res
          .status(404)
          .json({ message: "Colaboração não encontrada para deletar." });
      }
      await deleteColaboracao(colaboracaoId);
      res.json({ message: "Colaboração deletada com sucesso.", colaboracao });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao deletar a colaboração." });
    }
  }

  // Buscar colaborações por nome de espécie
  async getByEspecie(req: Request, res: Response) {
    const { nomeEspecie } = req.params;

    try {
      const colaboracoes = await findColaboracoesByEspecie(nomeEspecie);
      res.json(colaboracoes);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Erro ao buscar colaborações por espécie." });
    }
  }

  // Buscar colaborações por User ID
  async getByUserId(req: Request, res: Response) {
    const userId = parseInt(req.params.user_id);

    try {
      const colaboracoes = await findColaboracaoByUserId(userId);
      res.json(colaboracoes);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Erro ao buscar colaborações por usuário." });
    }
  }
}
