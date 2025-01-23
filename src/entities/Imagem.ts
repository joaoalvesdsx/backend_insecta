import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Colaboracao } from "./Colaboracao";
import { IsIn, IsString, Length } from "class-validator";

@Entity()
export class Imagem {
  @PrimaryGeneratedColumn()
  imagem_id?: number;

  @ManyToOne(() => Colaboracao, (colaboracao) => colaboracao.imagens)
  @JoinColumn({ name: "colaboracao_id" })
  colaboracao!: Colaboracao;

  @Column({ type: "varchar", length: 255, nullable: false })
  @IsString()
  @Length(1, 255)
  url_imagem!: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  @IsString()
  @Length(1, 255)
  descricao!: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: false,
    default: "Analise",
  })
  @IsIn(["Analise", "Aprovada", "Reprovada"])
  estado!: string;
}
