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
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PictureService } from './picture.service';
import { BasicAuthGuard } from '../auth/basic-auth.guard';
import { User } from '../user/user.entity';
import { GetUser } from 'src/decorator/get-user.decorator';

@Controller('pictures')
export class PictureController {
  constructor(private readonly pictureService: PictureService) {}

  @Get()
  async findAll(@Query('page') page = 1, @Query('take') take = 10) {
    return this.pictureService.findAll(+page, +take);
  }

  @Get('my-images')
  @UseGuards(BasicAuthGuard)
  async findMyImages(
    @GetUser() user,
    @Query('page') page = 1,
    @Query('take') take = 10,
  ) {
    return await this.pictureService.findMyImages(user, +page, +take);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.pictureService.findOne(id);
  }

  @Post()
  @UseGuards(BasicAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @GetUser() user: User,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('No file provided');
    return this.pictureService.create(
      user,
      file.originalname,
      file.buffer,
      file.mimetype,
    );
  }

  @Delete(':id')
  @UseGuards(BasicAuthGuard)
  async delete(@GetUser() user: User, @Param('id') id: string) {
    await this.pictureService.delete(user, id);
    return { message: 'Picture deleted successfully' };
  }
}
