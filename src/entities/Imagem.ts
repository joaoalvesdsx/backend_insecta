import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Colaboracao } from "./Colaboracao";

@Entity()
export class Imagem {
  @PrimaryGeneratedColumn()
  imagem_id?: number;

  @ManyToOne(() => Colaboracao, (colaboracao) => colaboracao.imagens)
  @JoinColumn({ name: "colaboracao_id" }) // Define o nome explícito da coluna no banco de dados
  colaboracao!: Colaboracao;

  @Column({ type: "varchar", length: 255, nullable: false })
  url_imagem!: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  descricao!: string;
}
