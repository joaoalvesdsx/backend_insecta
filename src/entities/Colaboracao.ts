import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsDate,
  IsOptional,
  Length,
  IsLatitude,
  IsLongitude,
  IsIn,
} from "class-validator";
import { User } from "./User";
import { Imagem } from "./Imagem";
import { Comentario } from "./Comentario";

@Entity()
export class Colaboracao {
  @PrimaryGeneratedColumn({ type: "int" })
  colaboracao_id?: number;

  @ManyToOne(() => User, (user) => user.colaboracoes, { nullable: false })
  @JoinColumn({ name: "user_id" })
  user!: User;

  @Column({ type: "varchar", length: 255 })
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  nome_especie!: string;

  @Column({ type: "datetime" })
  @IsDate()
  data!: Date;

  @Column({ type: "varchar", length: 100 })
  @IsString()
  @Length(1, 100)
  pais!: string;

  @Column({ type: "varchar", length: 100 })
  @IsString()
  @Length(1, 100)
  regiao!: string;

  @Column({ type: "varchar", length: 100 })
  @IsString()
  @Length(1, 100)
  estado!: string;

  @Column({ type: "varchar", length: 100 })
  @IsString()
  @Length(1, 100)
  municipio!: string;

  @Column({ type: "float" })
  @IsNumber()
  @IsLatitude()
  latitude!: number;

  @Column({ type: "float" })
  @IsNumber()
  @IsLongitude()
  longitude!: number;

  @Column({ type: "float" })
  @IsNumber()
  altitude!: number;

  @Column({ type: "varchar", length: 255 })
  @IsString()
  @Length(1, 255)
  coletor!: string;

  @Column({ type: "varchar", length: 255 })
  @IsString()
  @Length(1, 255)
  instituicao_coletor!: string;

  @Column({ type: "varchar", length: 255 })
  @IsString()
  @Length(1, 255)
  autor_foto!: string;

  @Column({ type: "varchar", length: 255 })
  @IsString()
  @Length(1, 255)
  instituicao_autor!: string;

  @Column({ type: "varchar", length: 100 })
  @IsString()
  @Length(1, 100)
  SISBIO!: string;

  @Column({ type: "varchar", length: 100 })
  @IsString()
  @Length(1, 100)
  SISGEN!: string;

  @Column({ type: "text" })
  @IsString()
  observacoes!: string;

  @Column({ type: "varchar", length: 100, default: "Em analise" })
  @IsString()
  @IsOptional()
  @Length(1, 100)
  @IsIn(["Em analise", "Aprovada", "Rejeitada", "Algo a corrigir"])
  status?: string;

  @OneToMany(() => Imagem, (imagem) => imagem.colaboracao)
  imagens!: Imagem[];

  @OneToMany(() => Comentario, (comentario) => comentario.colaboracao)
  comentarios!: Comentario[];
}
