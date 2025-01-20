import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Colaboracao } from "./Colaboracao";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id?: number;

  @Column({ type: "varchar", length: 50, default: "Comum" })
  tipo?: string;

  @Column({ type: "varchar", length: 255 })
  nome_completo!: string;

  @Column({ type: "bigint" })
  telefone!: number;

  @Column({ type: "bigint", default: null })
  whatsapp?: number;

  @Column({ type: "varchar", length: 255, unique: true })
  email!: string;

  @Column({ type: "varchar", length: 25, default: "" })
  instituicao?: string;

  @Column({ type: "varchar", length: 255, default: "" })
  curso?: string;

  @Column({ type: "varchar", length: 100, default: "" })
  nivel_academico?: string;

  @Column({ type: "varchar", length: 255, default: "" })
  link_lattes?: string;

  @Column({ type: "varchar", length: 255 })
  senha!: string;

  @OneToMany(() => Colaboracao, (colaboracao) => colaboracao.user)
  colaboracoes!: Colaboracao[];
}
