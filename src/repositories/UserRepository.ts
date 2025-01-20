import { AppDataSource } from "../database/connection";
import { User } from "../entities/User";

export const userRepository = AppDataSource.getRepository(User);

// Criar um novo usuário
async function createUser(userData: Partial<User>) {
  const user = userRepository.create(userData);
  return await userRepository.save(user);
}

// Buscar todos os usuários
async function findAllUsers() {
  return await userRepository.find();
}

// Buscar um usuário pelo ID
async function findUserById(id: number) {
  return await userRepository.findOneBy({ user_id: id });
}

export { createUser, findAllUsers, findUserById };
