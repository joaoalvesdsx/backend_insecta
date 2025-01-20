import request from "supertest";
import app from "../src/app"; // Sua instância do Express

describe("POST /users", () => {
  it("deve criar um novo usuário com dados válidos", async () => {
    const userData = {
      nome_completo: "João Silva",
      telefone: 123456789,
      whatsapp: 987654321,
      email: "joao@example.com",
      senha: "senha123",
    };

    const response = await request(app).post("/users").send(userData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("user_id");
  });

  it("não deve criar um usuário com email já existente", async () => {
    const userData = {
      tipo: "Comum",
      nome_completo: "Maria Souza",
      telefone: 123456789,
      whatsapp: 987654321,
      email: "joao@example.com", // Email já existente
      senha: "senha123",
    };

    const response = await request(app).post("/users").send(userData);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Email já cadastrado");
  });
});
