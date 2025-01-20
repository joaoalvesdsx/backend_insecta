import { AppDataSource } from "../database/connection";
import { Colaboracao } from "../entities/Colaboracao";

export const colaboracaoRepository = AppDataSource.getRepository(Colaboracao);

// Buscar todas as colaborações
async function findAllColaboracoes() {
  return await colaboracaoRepository.find();
}

// Criar uma nova colaboração
async function createColaboracao(colaboracaoData: Partial<Colaboracao>) {
  const colaboracao = colaboracaoRepository.create(colaboracaoData);
  return await colaboracaoRepository.save(colaboracao);
}

// Buscar uma colaboração por ID
async function findColaboracaoById(id: number) {
  return await colaboracaoRepository.findOneBy({ colaboracao_id: id });
}

// Atualizar uma colaboração existente
async function updateColaboracao(
  id: number,
  colaboracaoData: Partial<Colaboracao>
) {
  await colaboracaoRepository.update(id, colaboracaoData);
  return await findColaboracaoById(id);
}

// Deletar uma colaboração por ID
async function deleteColaboracao(id: number) {
  return await colaboracaoRepository.delete(id);
}

// Consultar colaborações por nome de espécie
async function findColaboracoesByEspecie(nomeEspecie: string) {
  return await colaboracaoRepository.find({
    where: { nome_especie: nomeEspecie },
  });
}

// Buscar colaborações por User ID (chave estrangeira)
async function findColaboracaoByUserId(userId: number) {
  return await colaboracaoRepository.find({
    where: { user: { user_id: userId } }, // Usando a relação com o User
    relations: ["user"], // Inclui a entidade "user" para facilitar o acesso
  });
}

export {
  findAllColaboracoes,
  createColaboracao,
  findColaboracaoById,
  updateColaboracao,
  deleteColaboracao,
  findColaboracoesByEspecie,
  findColaboracaoByUserId,
};
