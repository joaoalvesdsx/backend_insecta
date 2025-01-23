import { AppDataSource } from "../ormconfig";
import { Comentario } from "../entities/Comentario";

export const comentarioRepository = AppDataSource.getRepository(Comentario);

async function findAllComentarios() {
  return await comentarioRepository.find();
}

async function createComentario(comentarioData: Partial<Comentario>) {
  const comentario = comentarioRepository.create(comentarioData);
  return await comentarioRepository.save(comentario);
}

async function findComentarioById(id: number) {
  return await comentarioRepository.findOneBy({ comentario_id: id });
}

async function findComentariosByColaboracaoId(colaboracaoId: number) {
  return await comentarioRepository.find({
    where: { colaboracao: { colaboracao_id: colaboracaoId } }, // Usando a relação com o User
    relations: ["colaboracao"], // Inclui a entidade "user" para facilitar o acesso
  });
}

async function updateComentario(
  id: number,
  comentarioData: Partial<Comentario>
) {
  await comentarioRepository.update(id, comentarioData);
  return await findComentarioById(id);
}

async function deleteComentario(id: number) {
  return await comentarioRepository.delete(id);
}

export {
  findAllComentarios,
  createComentario,
  findComentarioById,
  updateComentario,
  deleteComentario,
  findComentariosByColaboracaoId,
};
