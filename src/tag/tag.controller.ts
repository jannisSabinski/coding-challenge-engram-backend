import { Body, Controller, Delete, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { TagService } from './tag.service';
import { BasicAuthGuard } from 'src/auth/basic-auth.guard';
import { addTagDto } from './dto/addTag.dto';
import { removeTagDto } from './dto/removeTag.dto';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  @UseGuards(BasicAuthGuard)
  async addTag(@Body() dto: addTagDto) {
    await this.tagService.addTag(dto);
    return { message: 'Tag assigned successfully' };
  }

  @Delete()
  @UseGuards(BasicAuthGuard)
  async removeTag(@Body() dto: removeTagDto) {
    await this.tagService.removeTag(dto);
    return { message: 'Tag removed successfully' };
  }
}
