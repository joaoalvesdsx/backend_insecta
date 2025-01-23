import { Request, Response } from "express";
import { login } from "../src/controllers/authController";
import { authenticateUser, generateToken } from "../src/services/authService";

jest.mock("../src/services/authService"); // Mocka os serviços de autenticação

describe("AuthController - login", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;

  beforeEach(() => {
    // Mocka as funções do objeto Response
    statusMock = jest.fn(() => ({ json: jsonMock }));
    jsonMock = jest.fn();

    req = {
      body: {},
    };

    res = {
      status: statusMock,
      json: jsonMock,
    };
  });

  afterEach(() => {
    jest.clearAllMocks(); // Limpa mocks após cada teste
  });

  it("deve retornar um token válido quando as credenciais forem corretas", async () => {
    req.body = { email: "test@example.com", senha: "123456" };

    const mockUser = { user_id: 1, email: "test@example.com" };
    const mockToken = "mock_token";

    // Mocka os serviços de autenticação e geração de token
    (authenticateUser as jest.Mock).mockResolvedValue(mockUser);
    (generateToken as jest.Mock).mockReturnValue(mockToken);

    await login(req as Request, res as Response);

    expect(authenticateUser).toHaveBeenCalledWith("test@example.com", "123456");
    expect(generateToken).toHaveBeenCalledWith(1);
    expect(jsonMock).toHaveBeenCalledWith({
      message: "Login bem-sucedido",
      token: mockToken,
    });
  });

  it("deve retornar erro 500 se o usuário não for autenticado", async () => {
    req.body = { email: "invalid@example.com", senha: "wrong_password" };

    // Mocka o serviço para retornar erro
    (authenticateUser as jest.Mock).mockRejectedValue(
      new Error("Credenciais inválidas")
    );

    await login(req as Request, res as Response);

    expect(authenticateUser).toHaveBeenCalledWith(
      "invalid@example.com",
      "wrong_password"
    );
    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({ message: "Erro ao fazer login" });
  });

  it("deve retornar erro 500 se o user_id for indefinido", async () => {
    req.body = { email: "test@example.com", senha: "123456" };

    const mockUser = { email: "test@example.com" }; // Sem `user_id`

    (authenticateUser as jest.Mock).mockResolvedValue(mockUser);

    await login(req as Request, res as Response);

    expect(authenticateUser).toHaveBeenCalledWith("test@example.com", "123456");
    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({ message: "Erro ao fazer login" });
  });

  it("deve retornar erro 500 para falhas inesperadas", async () => {
    req.body = { email: "test@example.com", senha: "123456" };

    // Mocka o serviço para lançar erro genérico
    (authenticateUser as jest.Mock).mockRejectedValue(
      new Error("Erro inesperado")
    );

    await login(req as Request, res as Response);

    expect(authenticateUser).toHaveBeenCalledWith("test@example.com", "123456");
    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({ message: "Erro ao fazer login" });
  });
});
