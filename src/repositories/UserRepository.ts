import { AppDataSource } from "../ormconfig";
import { User } from "../entities/User";
export const userRepository = AppDataSource.getRepository(User);

// Criar um novo usuário
async function createUser(userData: Partial<User>) {
  // Criar e salvar o novo usuário
  const newUser = userRepository.create(userData);
  return await userRepository.save(newUser);
}

// Buscar todos os usuários
async function findAllUsers() {
  return await userRepository.find();
}

// Buscar um usuário pelo ID
async function findUserById(id: number) {
  const user = await userRepository.findOneBy({ user_id: id });

  if (!user) {
    throw new Error(`Usuário com ID ${id} não encontrado`);
  }

  return await userRepository.findOneBy({ user_id: id });
}

async function updateUserTipo(id: number, novoTipo: string) {
  const user = await userRepository.findOneBy({ user_id: id });

  if (!user) {
    throw new Error(`Usuário com ID ${id} não encontrado`);
  }

  user.tipo = novoTipo;

  return await userRepository.save(user);
}

async function updateUserSenha(id: number, novaSenha: string) {
  const user = await userRepository.findOneBy({ user_id: id });

  if (!user) {
    throw new Error(`Usuário com ID ${id} não encontrado`);
  }

  user.senha = novaSenha;

  return await userRepository.save(user);
}
// Deletar um usuário pelo ID
async function deleteUser(id: number) {
  const user = await userRepository.findOneBy({ user_id: id });

  if (!user) {
    throw new Error(`Usuário com ID ${id} não encontrado`);
  }

  await userRepository.delete(id);

  return { message: `Usuário com ID ${id} foi deletado com sucesso` };
}
// Atualizar as informações não obrigatórias do usuário
async function updateUser(id: number, updates: Partial<User>) {
  // Remover o campo senha se existir no objeto de atualizações
  if (updates.senha) {
    delete updates.senha;
  }

  // Atualizar diretamente as colunas com o método update
  const result = await userRepository.update(id, updates);

  if (result.affected === 0) {
    throw new Error(`Usuário com ID ${id} não encontrado`);
  }

  // Retornar o usuário atualizado
  return await userRepository.findOneBy({ user_id: id });
}
export {
  createUser,
  findAllUsers,
  findUserById,
  updateUserTipo,
  updateUserSenha,
  deleteUser,
  updateUser,
};
