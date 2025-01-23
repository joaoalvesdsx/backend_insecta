import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { IsNotEmpty, IsString, Length } from "class-validator";
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
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  assunto!: string;

  @Column({ type: "text" })
  @IsString()
  @IsNotEmpty()
  comentario!: string;
}
