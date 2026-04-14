import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class removeTagDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    format: 'uuid',
    example: '9322c384-fd8e-4a13-80cd-1cbd1ef95ba8',
    description: 'Tag-ID',
  })
  tagId!: string;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    format: 'uuid',
    example: '9322c384-fd8e-4a13-80cd-1cbd1ef95ba8',
    description: 'Bild-ID',
  })
  pictureId!: string;
}