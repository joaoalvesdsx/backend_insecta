import { AppDataSource } from "../ormconfig";

export const connectToDatabase = async (): Promise<void> => {
  try {
    await AppDataSource.initialize();
    console.log("Conexão com o banco de dados MySQL estabelecida com sucesso!");
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
    process.exit(1);
  }
};
