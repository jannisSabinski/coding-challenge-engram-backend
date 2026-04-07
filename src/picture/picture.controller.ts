import {
  Controller,
  Post,
  Delete,
  Get,
  Param,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Patch,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PictureService } from './picture.service';
import { BasicAuthGuard } from '../auth/basic-auth.guard';
import { User } from '../user/user.entity';
import { GetUser } from 'src/decorator/get-user.decorator';

@Controller('pictures')
export class PictureController {
  constructor(private readonly pictureService: PictureService) {}

  // ─── Public ───────────────────────────────────────────────

  @Get()
  async findAll() {
    return this.pictureService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.pictureService.findOne(id);
  }

  // ─── Protected ────────────────────────────────────────────

  @Post()
  @UseGuards(BasicAuthGuard)
  @UseInterceptors(FileInterceptor('file')) 
  async upload(
    @GetUser() user: User,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('No file provided');
    return this.pictureService.create(user, file.buffer, file.mimetype);
  }

  @Patch(':id')
  @UseGuards(BasicAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @GetUser() user: User,
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('No file provided');
    return this.pictureService.updateFile(user, id, file.buffer, file.mimetype);
  }

  @Delete(':id')
  @UseGuards(BasicAuthGuard)
  async delete(@GetUser() user: User, @Param('id') id: string) {
    await this.pictureService.delete(user, id);
    return { message: 'Picture deleted successfully' };
  }
}
