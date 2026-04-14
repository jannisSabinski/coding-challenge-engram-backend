import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class addTagDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    format: 'uuid',
    example: '9322c384-fd8e-4a13-80cd-1cbd1ef95ba8',
    description: 'Bild-ID',
  })
  pictureId!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'nature',
    description: 'Der Name des Tags',
  })
  name!: string;
}
