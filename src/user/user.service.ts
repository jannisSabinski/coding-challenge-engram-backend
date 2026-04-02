import { ConflictException, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createUserDto } from './dto';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(dto: createUserDto): Promise<void> {
    if(await this.findByUsername(dto.name))throw new ConflictException('Username already taken');

    const passwordHash = await argon2.hash(dto.password);
    const newUser = this.userRepository.create({ name: dto.name, passwordHash});
    await this.userRepository.save(newUser);
  }

  async delete(userId: string): Promise<void> {
    await this.userRepository.delete(userId);
    //TODO rewrite when bucket + files exist
  }

  async changePassword(userId: string, newPassword: string): Promise<void> {
    const passwordHash = await argon2.hash(newPassword);
    await this.userRepository.update(userId, {passwordHash: passwordHash});
  }

  async findByUsername(name: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { name } });
  }
}
