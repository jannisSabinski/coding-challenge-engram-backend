import { Tag } from '../tag/tag.entity';
import { User } from '../user/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  ManyToMany,
} from 'typeorm';

@Entity()
export class Picture {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  storageName: string;

  @Column()
  fileName: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.pictures)
  user: User;

  @ManyToMany(() => Tag, (tag) => tag.pictures)
  tags: Tag[];
}
