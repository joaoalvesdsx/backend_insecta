import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import {
  IsString,
  IsOptional,
  IsEmail,
  Length,
  IsNumber,
  IsNotEmpty,
  IsIn,
} from "class-validator";
import { Colaboracao } from "./Colaboracao";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id?: number;

  @Column({ type: "varchar", length: 50, default: "Comum" })
  @IsString()
  @IsOptional()
  @IsIn(["Comum", "Colaborador", "Admin"])
  @Length(1, 50)
  tipo?: string;

  @Column({ type: "varchar", length: 255 })
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  nome_completo!: string;

  @Column({ type: "bigint" })
  @IsNumber()
  telefone!: number;

  @Column({ type: "bigint", default: null })
  @IsNumber()
  @IsOptional()
  whatsapp?: number;

  @Column({ type: "varchar", length: 255, unique: true })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @Column({ type: "varchar", length: 25, default: "" })
  @IsString()
  @IsOptional()
  @Length(1, 25)
  instituicao?: string;

  @Column({ type: "varchar", length: 255, default: "" })
  @IsString()
  @IsOptional()
  @Length(1, 255)
  curso?: string;

  @Column({ type: "varchar", length: 100, default: "" })
  @IsString()
  @IsOptional()
  @Length(1, 100)
  nivel_academico?: string;

  @Column({ type: "varchar", length: 255, default: "" })
  @IsString()
  @IsOptional()
  @Length(1, 255)
  link_lattes?: string;

  @Column({ type: "varchar", length: 255 })
  @IsString()
  @IsNotEmpty()
  @Length(8, 255) // Garantindo que a senha tenha um comprimento mínimo
  senha!: string;

  @OneToMany(() => Colaboracao, (colaboracao) => colaboracao.user)
  colaboracoes!: Colaboracao[];
}
