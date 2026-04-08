import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Picture } from './picture.entity';
import { User } from '../user/user.entity';
import { SupabaseService } from '../supabase/supabase.service';
import { mimeToExt } from '../common/utils/mime-to-ext';

@Injectable()
export class PictureService {
  constructor(
    @InjectRepository(Picture)
    private readonly pictureRepository: Repository<Picture>,
    private readonly supabaseService: SupabaseService,
  ) {}

  async create(user: User, fileName:string, buffer: Buffer, mimetype: string): Promise<Picture> {
    const ext = mimeToExt(mimetype);
    const pictureId = uuidv4();
    const storageName = `${pictureId}.${ext}`;

    await this.supabaseService.upload(storageName, buffer, mimetype);

    return this.pictureRepository.save({
      id: pictureId,
      fileName: fileName,
      storageName: storageName,
      user: user,
    });
  }

  async updateFile(
    user: User,
    pictureId: string,
    buffer: Buffer,
    mimetype: string,
    fileName: string
  ): Promise<void> {
    const picture = await this.pictureRepository.findOne({
      where: { id: pictureId },
      relations: ['user'],
    });
    if (!picture) throw new NotFoundException('Picture not found');
    if (picture.user.id !== user.id) throw new ForbiddenException();

    const ext = mimeToExt(mimetype);
    const newFileName = `${pictureId}.${ext}`;
    
    await this.supabaseService.update(newFileName, buffer, mimetype);
    await this.pictureRepository.save({ ...picture, storageName: newFileName , fileName: fileName});
  }

  async delete(user: User, pictureId: string): Promise<void> {
    const picture = await this.pictureRepository.findOne({
      where: { id: pictureId },
      relations: ['user'],
    });
    if (!picture) throw new NotFoundException('Picture not found');
    if (picture.user.id !== user.id) throw new ForbiddenException();

    await this.supabaseService.delete(picture.storageName);
    await this.pictureRepository.delete(pictureId);
  }

  async findAll(): Promise<Picture[]> {
    return this.pictureRepository.find({ relations: ['user', 'tags'] });
  }

  async findOne(pictureId: string): Promise<Picture> {
    const picture = await this.pictureRepository.findOne({
      where: { id: pictureId },
      relations: ['user', 'tags'],
    });
    if (!picture) throw new NotFoundException('Picture not found');
    return picture;
  }
}
