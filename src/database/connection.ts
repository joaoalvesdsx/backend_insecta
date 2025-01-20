import { DataSource } from "typeorm";
import dotenv from "dotenv";

// Carrega as variáveis do .env
dotenv.config();
export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST, // Host do banco de dados
  port: parseInt(process.env.DB_PORT || "3306"), // Porta do banco
  username: process.env.DB_USER, // Usuário do banco
  password: process.env.DB_PASS, // Senha do banco
  database: process.env.DB_NAME, // Nome do banco
  synchronize: true, // Sincroniza automaticamente as entidades com o banco
  logging: true, // Habilita logs para debug
  entities: ["src/entities/*.ts"], // Caminho das entidades
});

export const connectToDatabase = async (): Promise<void> => {
  try {
    await AppDataSource.initialize();
    console.log("Conexão com o banco de dados MySQL estabelecida com sucesso!");
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
    process.exit(1);
  }
};
