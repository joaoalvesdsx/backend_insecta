import express from "express";
import { connectToDatabase } from "./database/connection";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import routes from "./routes";

const app = express();

// Middlewares
app.use(express.json());

app.use(routes);
app.use(userRoutes); // Usando as rotas de usuário aqui
app.use(authRoutes); // Usando as rotas de autenticação aqui

// Inicializar o banco de dados
connectToDatabase();

export default app;
