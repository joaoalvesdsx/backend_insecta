import { AppDataSource } from "../ormconfig";
import { Imagem } from "../entities/Imagem";

export const imagemRepository = AppDataSource.getRepository(Imagem);

async function findAllImagens() {
  return await imagemRepository.find();
}

async function createImagem(imagemData: Partial<Imagem>) {
  const imagem = imagemRepository.create(imagemData);
  return await imagemRepository.save(imagem);
}
