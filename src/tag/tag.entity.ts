import { Picture } from '../picture/picture.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToMany,
} from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  tagName!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToMany(() => Picture, (picture) => picture.tags)
  pictures!: Picture[];
}