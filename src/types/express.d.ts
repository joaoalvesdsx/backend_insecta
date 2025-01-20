import { UserPayload } from "../types/user"; // Importe seu tipo de payload do usuário

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload; // Adicione a propriedade `user` ao tipo Request
    }
  }
}
