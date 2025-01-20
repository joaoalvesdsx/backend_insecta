import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Colaboracao } from "./Colaboracao";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id?: number; // Tornando o user_id opcional

  @Column({ type: "varchar", length: 50 })
  tipo!: string;

  @Column({ type: "varchar", length: 255 })
  nome_completo!: string;

  @Column({ type: "bigint" })
  telefone!: number;

  @Column({ type: "bigint" })
  whatsapp!: number;

  @Column({ type: "varchar", length: 255, unique: true })
  email!: string;

  @Column({ type: "varchar", length: 255 })
  instituicao!: string;

  @Column({ type: "varchar", length: 255 })
  curso!: string;

  @Column({ type: "varchar", length: 100 })
  nivel_academico!: string;

  @Column({ type: "varchar", length: 255 })
  link_lattes!: string;

  @Column({ type: "varchar", length: 255 })
  senha!: string;

  @OneToMany(() => Colaboracao, (colaboracao) => colaboracao.user)
  colaboracoes!: Colaboracao[];
}
