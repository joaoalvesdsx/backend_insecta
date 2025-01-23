import { Request, Response } from "express";
import { UserController } from "../src/controllers/userController";
import {
  createUser,
  deleteUser,
  findAllUsers,
  findUserById,
  updateUser,
  updateUserSenha,
  updateUserTipo,
  userRepository,
} from "../src/repositories/UserRepository";

jest.mock("../src/repositories/UserRepository"); // Mock das funções no repositório

describe("UserController", () => {
  let userController: UserController;
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    userController = new UserController();

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

  // Teste para criar um novo usuário
  it("deve criar um novo usuário com sucesso", async () => {
    const mockUser = { id: 1, name: "Test User" };
    (createUser as jest.Mock).mockResolvedValue(mockUser);

    req.body = { name: "Test User", email: "test@example.com" };

    await userController.create(req as Request, res as Response);

    expect(createUser).toHaveBeenCalledWith(req.body);
    expect(statusMock).toHaveBeenCalledWith(201);
    expect(jsonMock).toHaveBeenCalledWith(mockUser);
  });

  it("deve retornar erro ao criar usuário", async () => {
    (createUser as jest.Mock).mockRejectedValue(new Error("Erro"));

    await userController.create(req as Request, res as Response);

    expect(createUser).toHaveBeenCalledWith(req.body);
    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({
      message: "Erro ao criar o usuário.",
    });
  });

  // Teste para buscar todos os usuários
  it("deve retornar todos os usuários", async () => {
    const mockUsers = [
      { id: 1, name: "User 1" },
      { id: 2, name: "User 2" },
    ];
    (findAllUsers as jest.Mock).mockResolvedValue(mockUsers);

    await userController.getAll(req as Request, res as Response);

    expect(findAllUsers).toHaveBeenCalled();
    expect(jsonMock).toHaveBeenCalledWith(mockUsers);
  });

  it("deve retornar erro ao buscar usuários", async () => {
    (findAllUsers as jest.Mock).mockRejectedValue(new Error("Erro"));

    await userController.getAll(req as Request, res as Response);

    expect(findAllUsers).toHaveBeenCalled();
    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({
      message: "Erro ao buscar os usuários.",
    });
  });

  // Teste para buscar usuário por ID
  it("deve retornar um usuário pelo ID", async () => {
    const mockUser = { id: 1, name: "User 1" };
    (findUserById as jest.Mock).mockResolvedValue(mockUser);

    req.params = { user_id: "1" };

    await userController.getById(req as Request, res as Response);

    expect(findUserById).toHaveBeenCalledWith(1);
    expect(jsonMock).toHaveBeenCalledWith(mockUser);
  });

  it("deve retornar erro ao buscar usuário por ID", async () => {
    (findUserById as jest.Mock).mockRejectedValue(new Error("Erro"));

    req.params = { user_id: "1" };

    await userController.getById(req as Request, res as Response);

    expect(findUserById).toHaveBeenCalledWith(1);
    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({
      message: "Erro ao buscar o usuário.",
    });
  });

  // Teste para deletar usuário por ID
  it("deve deletar um usuário pelo ID", async () => {
    const mockUser = { id: 1, name: "User 1" };
    (findUserById as jest.Mock).mockResolvedValue(mockUser);
    (deleteUser as jest.Mock).mockResolvedValue(undefined);

    req.params = { user_id: "1" };

    await userController.deleteById(req as Request, res as Response);

    expect(findUserById).toHaveBeenCalledWith(1);
    expect(deleteUser).toHaveBeenCalledWith(1);
    expect(jsonMock).toHaveBeenCalledWith(mockUser);
  });

  it("deve retornar erro ao deletar usuário", async () => {
    (findUserById as jest.Mock).mockRejectedValue(new Error("Erro"));

    req.params = { user_id: "1" };

    await userController.deleteById(req as Request, res as Response);

    expect(findUserById).toHaveBeenCalledWith(1);
    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({
      message: "Erro ao deletar o usuário.",
    });
  });
});
