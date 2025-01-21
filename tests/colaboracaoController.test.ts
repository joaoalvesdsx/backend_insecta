import { Request, Response } from "express";
import { ColaboracaoController } from "../src/controllers/colaboracaoController";
import {
  createColaboracao,
  deleteColaboracao,
  findAllColaboracoes,
  findColaboracaoById,
  updateColaboracao,
  findColaboracoesByEspecie,
  findColaboracaoByUserId,
} from "../src/repositories/ColaboracaoRepository";

jest.mock("../src/repositories/ColaboracaoRepository");

describe("ColaboracaoController", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let controller: ColaboracaoController;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;

  beforeEach(() => {
    controller = new ColaboracaoController();

    statusMock = jest.fn(() => ({ json: jsonMock }));
    jsonMock = jest.fn();

    req = {
      params: {},
      body: {},
    };

    res = {
      status: statusMock,
      json: jsonMock,
    };
  });

  afterEach(() => {
    jest.clearAllMocks(); // Limpa os mocks após cada teste
  });

  describe("create", () => {
    it("deve criar uma nova colaboração e retornar status 201", async () => {
      req.body = { nome_especie: "Espécie Teste", user_id: 1 };

      const mockColaboracao = { colaboracao_id: 1, ...req.body };
      (createColaboracao as jest.Mock).mockResolvedValue(mockColaboracao);

      await controller.create(req as Request, res as Response);

      expect(createColaboracao).toHaveBeenCalledWith(req.body);
      expect(statusMock).toHaveBeenCalledWith(201);
      expect(jsonMock).toHaveBeenCalledWith(mockColaboracao);
    });

    it("deve retornar erro 500 em caso de falha ao criar", async () => {
      req.body = { nome_especie: "Espécie Teste", user_id: 1 };

      (createColaboracao as jest.Mock).mockRejectedValue(new Error("Erro"));

      await controller.create(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({
        message: "Erro ao criar a colaboração.",
      });
    });
  });

  describe("getAll", () => {
    it("deve retornar todas as colaborações", async () => {
      const mockColaboracoes = [{ colaboracao_id: 1, nome_especie: "Teste" }];
      (findAllColaboracoes as jest.Mock).mockResolvedValue(mockColaboracoes);

      await controller.getAll(req as Request, res as Response);

      expect(findAllColaboracoes).toHaveBeenCalled();
      expect(jsonMock).toHaveBeenCalledWith(mockColaboracoes);
    });

    it("deve retornar erro 500 ao buscar todas as colaborações", async () => {
      (findAllColaboracoes as jest.Mock).mockRejectedValue(new Error("Erro"));

      await controller.getAll(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({
        message: "Erro ao buscar as colaborações.",
      });
    });
  });

  describe("getById", () => {
    it("deve retornar uma colaboração pelo ID", async () => {
      req.params = { colaboracao_id: "1" };
      const mockColaboracao = { colaboracao_id: 1, nome_especie: "Teste" };

      (findColaboracaoById as jest.Mock).mockResolvedValue(mockColaboracao);

      await controller.getById(req as Request, res as Response);

      expect(findColaboracaoById).toHaveBeenCalledWith(1);
      expect(jsonMock).toHaveBeenCalledWith(mockColaboracao);
    });

    it("deve retornar erro 404 se a colaboração não for encontrada", async () => {
      req.params = { colaboracao_id: "1" };

      (findColaboracaoById as jest.Mock).mockResolvedValue(null);

      await controller.getById(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({
        message: "Colaboração não encontrada.",
      });
    });

    it("deve retornar erro 500 em caso de falha", async () => {
      req.params = { colaboracao_id: "1" };

      (findColaboracaoById as jest.Mock).mockRejectedValue(new Error("Erro"));

      await controller.getById(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({
        message: "Erro ao buscar a colaboração.",
      });
    });
  });

  describe("deleteById", () => {
    it("deve deletar uma colaboração pelo ID", async () => {
      req.params = { colaboracao_id: "1" };
      const mockColaboracao = { colaboracao_id: 1, nome_especie: "Teste" };

      (findColaboracaoById as jest.Mock).mockResolvedValue(mockColaboracao);
      (deleteColaboracao as jest.Mock).mockResolvedValue(undefined);

      await controller.deleteById(req as Request, res as Response);

      expect(findColaboracaoById).toHaveBeenCalledWith(1);
      expect(deleteColaboracao).toHaveBeenCalledWith(1);
      expect(jsonMock).toHaveBeenCalledWith({
        message: "Colaboração deletada com sucesso.",
        colaboracao: mockColaboracao,
      });
    });

    it("deve retornar erro 404 se a colaboração não for encontrada", async () => {
      req.params = { colaboracao_id: "1" };

      (findColaboracaoById as jest.Mock).mockResolvedValue(null);

      await controller.deleteById(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({
        message: "Colaboração não encontrada para deletar.",
      });
    });

    it("deve retornar erro 500 em caso de falha", async () => {
      req.params = { colaboracao_id: "1" };

      (findColaboracaoById as jest.Mock).mockRejectedValue(new Error("Erro"));

      await controller.deleteById(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({
        message: "Erro ao deletar a colaboração.",
      });
    });
  });
});
