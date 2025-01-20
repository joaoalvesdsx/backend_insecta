import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { Imagem } from "./Imagem";

@Entity()
export class Colaboracao {
  @PrimaryGeneratedColumn({ type: "int" })
  colaboracao_id?: number; // Tornando colaboracao_id opcional

  @ManyToOne(() => User, (user) => user.colaboracoes)
  @JoinColumn({ name: "user_id" }) // Define o nome explícito da coluna no banco de dados
  user!: User;
  @Column({ type: "varchar", length: 255 })
  nome_especie!: string;

  @Column({ type: "datetime" })
  data!: Date;

  @Column({ type: "varchar", length: 100 })
  pais!: string;

  @Column({ type: "varchar", length: 100 })
  regiao!: string;

  @Column({ type: "varchar", length: 100 })
  estado!: string;

  @Column({ type: "varchar", length: 100 })
  municipio!: string;

  @Column({ type: "float" })
  latitude!: number;

  @Column({ type: "float" })
  longitude!: number;

  @Column({ type: "float" })
  altitude!: number;

  @Column({ type: "varchar", length: 255 })
  coletor!: string;

  @Column({ type: "varchar", length: 255 })
  instituicao_coletor!: string;

  @Column({ type: "varchar", length: 255 })
  autor_foto!: string;

  @Column({ type: "varchar", length: 255 })
  instituicao_autor!: string;

  @Column({ type: "varchar", length: 100 })
  SISBIO!: string;

  @Column({ type: "varchar", length: 100 })
  SISGEN!: string;

  @Column({ type: "text" })
  observacoes!: string;

  @Column({ type: "varchar", length: 100 })
  status!: string;

  @OneToMany(() => Imagem, (imagem) => imagem.colaboracao)
  imagens!: Imagem[];
}
