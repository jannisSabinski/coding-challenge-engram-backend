import { ConflictException, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { createUserDto } from './dto';
import * as argon2 from 'argon2';
import { Picture } from 'src/picture/picture.entity';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Picture)
    private readonly pictureRepository: Repository<Picture>,
    private readonly supabaseService: SupabaseService,
    private readonly entityManager: EntityManager,
  ) {}

  async create(dto: createUserDto): Promise<void> {
    if (await this.findByUsername(dto.name))
      throw new ConflictException('Username already taken');

    const passwordHash = await argon2.hash(dto.password);
    const newUser = this.userRepository.create({
      name: dto.name,
      passwordHash,
    });
    await this.userRepository.save(newUser);
  }

  async delete(userId: string): Promise<void> {
    const pictures = await this.pictureRepository.find({
      where: { user: { id: userId } },
    });

    for (const picture of pictures) {
      await this.supabaseService.delete(picture.storageName);
    }
    await this.entityManager.transaction(async (manager) => {
      if (pictures.length > 0) {
        await manager.delete(Picture, { user: { id: userId } });
      }
      const result = await manager.delete(User, userId);
    });
  }

  async changePassword(userId: string, newPassword: string): Promise<void> {
    const passwordHash = await argon2.hash(newPassword);
    await this.userRepository.update(userId, { passwordHash: passwordHash });
  }

  async findByUsername(name: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { name } });
  }
}
