import { Body, Controller, Delete, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { TagService } from './tag.service';
import { BasicAuthGuard } from 'src/auth/basic-auth.guard';
import { addTagDto } from './dto/addTag.dto';
import { removeTagDto } from './dto/removeTag.dto';
import { ApiBasicAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiBasicAuth()
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  @UseGuards(BasicAuthGuard)
  @ApiOperation({ summary: 'Weist einem Bild einen (neuen) Tag zu' })
  @ApiResponse({ status: 201, description: 'Tag erfolgreich zugewiesen.' })
  @ApiResponse({ status: 401, description: 'Nicht autorisiert.' })
  async addTag(@Body() dto: addTagDto) {
    await this.tagService.addTag(dto);
    return { message: 'Tag assigned successfully' };
  }

  @Delete()
  @UseGuards(BasicAuthGuard)
  @ApiOperation({ summary: 'Entfernt einen Tag von einem Bild' })
  @ApiResponse({ status: 200, description: 'Tag erfolgreich entfernt.' })
  @ApiResponse({ status: 401, description: 'Nicht autorisiert.' })
  async removeTag(@Body() dto: removeTagDto) {
    await this.tagService.removeTag(dto);
    return { message: 'Tag removed successfully' };
  }
}
