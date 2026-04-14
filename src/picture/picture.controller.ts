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
import {
  ApiConsumes,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiBasicAuth,
  ApiParam,
} from '@nestjs/swagger';

@Controller('pictures')
export class PictureController {
  constructor(private readonly pictureService: PictureService) {}

  @Get()
  @ApiOperation({ summary: 'Alle Bilder-Metadaten abrufen (paginiert)' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'take', required: false, example: 10 })
  @ApiResponse({ status: 200, description: 'Liste aller Bilder' })
  async findAll(@Query('page') page = 1, @Query('take') take = 10) {
    return this.pictureService.findAll(+page, +take);
  }

  @Get('my-images')
  @UseGuards(BasicAuthGuard)
  @ApiBasicAuth()
  @ApiOperation({ summary: 'Eigene Bilder-Metadaten abrufen (paginiert)' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'take', required: false, example: 10 })
  @ApiResponse({ status: 200, description: 'Liste der eigenen Bilder' })
  @ApiResponse({ status: 401, description: 'Nicht autorisiert' })
  async findMyImages(
    @GetUser() user,
    @Query('page') page = 1,
    @Query('take') take = 10,
  ) {
    return await this.pictureService.findMyImages(user, +page, +take);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Bild-Metadaten anhand der ID abrufen' })
  @ApiParam({ name: 'id', description: 'Bild-ID' })
  @ApiResponse({ status: 200, description: 'Bilddaten' })
  @ApiResponse({ status: 404, description: 'Bild nicht gefunden' })
  async findOne(@Param('id') id: string) {
    return this.pictureService.findOne(id);
  }

  @Post()
  @UseGuards(BasicAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @ApiBasicAuth()
  @ApiOperation({ summary: 'Bild hochladen' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary', description: 'Bilddatei' },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Bild erfolgreich hochgeladen' })
  @ApiResponse({ status: 400, description: 'Keine Datei angegeben' })
  @ApiResponse({ status: 401, description: 'Nicht autorisiert' })
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
  @ApiBasicAuth()
  @ApiOperation({ summary: 'Bild löschen' })
  @ApiParam({ name: 'id', description: 'Bild-ID' })
  @ApiResponse({ status: 200, description: 'Bild erfolgreich gelöscht' })
  @ApiResponse({ status: 401, description: 'Nicht autorisiert' })
  @ApiResponse({ status: 404, description: 'Bild nicht gefunden' })
  async delete(@GetUser() user: User, @Param('id') id: string) {
    await this.pictureService.delete(user, id);
    return { message: 'Picture deleted successfully' };
  }
}
