import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Picture } from 'src/picture/picture.entity';
import { EntityManager, Repository } from 'typeorm';
import { Tag } from './tag.entity';
import { addTagDto } from './dto/addTag.dto';
import { removeTagDto } from './dto/removeTag.dto';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Picture)
    private readonly pictureRepository: Repository<Picture>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
    private readonly entityManager: EntityManager,
  ) {}

  async addTag(dto: addTagDto): Promise<void> {
    if (!(await this.pictureExists(dto.pictureId)))
      throw new NotFoundException('Picture not found');

    let tag: Tag | null = await this.tagRepository.findOne({where: {tagName: dto.name}});

    if(!tag){
      tag = await this.tagRepository.save({
        tagName: dto.name,
      });
    }

    if (await this.isAssigned(dto.pictureId, tag.id)) {
      throw new ConflictException('Tag already assigned to this picture');
    } else {
      await this.pictureRepository
        .createQueryBuilder()
        .relation('tags')
        .of(dto.pictureId)
        .add(tag.id);
    }
  }

  async removeTag(dto: removeTagDto): Promise<void> {
    if (!(await this.pictureExists(dto.pictureId)))
      throw new NotFoundException('Picture not found');
    if (!(await this.tagExists(dto.tagId)))
      throw new NotFoundException('Tag not found');
    if (!(await this.isAssigned(dto.pictureId, dto.tagId)))
      throw new NotFoundException('Tag not assigned to this picture');

    await this.entityManager.transaction(async (manager) => {
      await manager
        .createQueryBuilder()
        .relation(Picture, 'tags')
        .of(dto.pictureId)
        .remove(dto.tagId);

      const isOrphaned = !(await manager
        .createQueryBuilder(Picture, 'picture')
        .leftJoin('picture.tags', 'tag')
        .where('tag.id = :tagId', { tagId: dto.tagId })
        .getExists());

      if (isOrphaned) await manager.delete(Tag, dto.tagId);
    });
  }

  private async isAssigned(pictureId: string, tagId: string): Promise<boolean> {
    return await this.pictureRepository
      .createQueryBuilder('picture')
      .leftJoin('picture.tags', 'tag')
      .where('picture.id = :pictureId', { pictureId })
      .andWhere('tag.id = :tagId', { tagId })
      .getExists();
  }

  private async pictureExists(pictureId: string): Promise<boolean> {
    return await this.pictureRepository.exists({
      where: { id: pictureId },
    });
  }

  private async tagExists(tagId: string): Promise<boolean> {
    return await this.tagRepository.exists({
      where: { id: tagId },
    });
  }
}
