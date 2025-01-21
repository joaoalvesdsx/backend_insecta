import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Colaboracao } from "./Colaboracao";

@Entity()
export class Comentario {
  @PrimaryGeneratedColumn({ type: "int" })
  comentario_id!: number;

  @ManyToOne(() => Colaboracao, (colaboracao) => colaboracao.comentarios, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "colaboracao_id" }) // Define a chave estrangeira no banco de dados
  colaboracao!: Colaboracao;

  @Column({ type: "varchar", length: 255 })
  assunto!: string;

  @Column({ type: "text" })
  comentario!: string;
}
