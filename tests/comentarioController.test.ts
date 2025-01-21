import { Request, Response } from "express";
import { ComentarioController } from "../src/controllers/comentarioController";
import {
  createComentario,
  deleteComentario,
  findAllComentarios,
  findComentarioById,
  updateComentario,
} from "../src/repositories/ComentarioRepository";

jest.mock("../src/repositories/ComentarioRepository"); // Mock das funções no repositório

describe("ComentarioController", () => {
  let comentarioController: ComentarioController;
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    comentarioController = new ComentarioController();

    jsonMock = jest.fn();
    statusMock = jest.fn(() => ({
      json: jsonMock,
    }));

    req = {
      body: {},
      params: {},
    };
    res = {
      status: statusMock,
      json: jsonMock,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Teste para criar um novo comentário
  it("deve criar um novo comentário com sucesso", async () => {
    const mockComentario = { id: 1, content: "Comentário de Teste" };
    (createComentario as jest.Mock).mockResolvedValue(mockComentario);

    req.body = { content: "Comentário de Teste", postId: 1 };

    await comentarioController.create(req as Request, res as Response);

    expect(createComentario).toHaveBeenCalledWith(req.body);
    expect(statusMock).toHaveBeenCalledWith(201);
    expect(jsonMock).toHaveBeenCalledWith(mockComentario);
  });

  it("deve retornar erro ao criar comentário", async () => {
    (createComentario as jest.Mock).mockRejectedValue(new Error("Erro"));

    await comentarioController.create(req as Request, res as Response);

    expect(createComentario).toHaveBeenCalledWith(req.body);
    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({
      message: "Erro ao criar o comentário.",
    });
  });

  // Teste para buscar todos os comentários
  it("deve retornar todos os comentários", async () => {
    const mockComentarios = [
      { id: 1, content: "Comentário 1" },
      { id: 2, content: "Comentário 2" },
    ];
    (findAllComentarios as jest.Mock).mockResolvedValue(mockComentarios);

    await comentarioController.getAll(req as Request, res as Response);

    expect(findAllComentarios).toHaveBeenCalled();
    expect(jsonMock).toHaveBeenCalledWith(mockComentarios);
  });

  it("deve retornar erro ao buscar comentários", async () => {
    (findAllComentarios as jest.Mock).mockRejectedValue(new Error("Erro"));

    await comentarioController.getAll(req as Request, res as Response);

    expect(findAllComentarios).toHaveBeenCalled();
    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({
      message: "Erro ao buscar os comentários.",
    });
  });

  // Teste para buscar comentário por ID
  it("deve retornar um comentário pelo ID", async () => {
    const mockComentario = { id: 1, content: "Comentário 1" };
    (findComentarioById as jest.Mock).mockResolvedValue(mockComentario);

    req.params = { comentario_id: "1" };

    await comentarioController.getById(req as Request, res as Response);

    expect(findComentarioById).toHaveBeenCalledWith(1);
    expect(jsonMock).toHaveBeenCalledWith(mockComentario);
  });

  it("deve retornar erro ao buscar comentário por ID", async () => {
    (findComentarioById as jest.Mock).mockRejectedValue(new Error("Erro"));

    req.params = { comentario_id: "1" };

    await comentarioController.getById(req as Request, res as Response);

    expect(findComentarioById).toHaveBeenCalledWith(1);
    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({
      message: "Erro ao buscar o comentário.",
    });
  });

  // Teste para atualizar um comentário
  it("deve atualizar um comentário com sucesso", async () => {
    const mockComentario = { id: 1, content: "Comentário Atualizado" };
    (updateComentario as jest.Mock).mockResolvedValue(mockComentario);

    req.params = { comentario_id: "1" };
    req.body = { content: "Comentário Atualizado" };

    await comentarioController.update(req as Request, res as Response);

    expect(updateComentario).toHaveBeenCalledWith(1, req.body);
    expect(jsonMock).toHaveBeenCalledWith(mockComentario);
  });

  it("deve retornar erro ao atualizar comentário", async () => {
    (updateComentario as jest.Mock).mockRejectedValue(new Error("Erro"));

    req.params = { comentario_id: "1" };
    req.body = { content: "Comentário Atualizado" };

    await comentarioController.update(req as Request, res as Response);

    expect(updateComentario).toHaveBeenCalledWith(1, req.body);
    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({
      message: "Erro ao atualizar o comentário.",
    });
  });

  // Teste para deletar comentário por ID
  it("deve deletar um comentário pelo ID", async () => {
    const mockComentario = { id: 1, content: "Comentário 1" };
    (findComentarioById as jest.Mock).mockResolvedValue(mockComentario);
    (deleteComentario as jest.Mock).mockResolvedValue(undefined);

    req.params = { comentario_id: "1" };

    await comentarioController.deleteById(req as Request, res as Response);

    expect(findComentarioById).toHaveBeenCalledWith(1);
    expect(deleteComentario).toHaveBeenCalledWith(1);

    expect(jsonMock).toHaveBeenCalledWith({
      message: "Comentário deletado com sucesso.",
      comentario: mockComentario,
    });
  });

  it("deve retornar erro ao deletar comentário", async () => {
    (findComentarioById as jest.Mock).mockRejectedValue(new Error("Erro"));

    req.params = { comentario_id: "1" };

    await comentarioController.deleteById(req as Request, res as Response);

    expect(findComentarioById).toHaveBeenCalledWith(1);
    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({
      message: "Erro ao deletar o comentário.",
    });
  });
});
