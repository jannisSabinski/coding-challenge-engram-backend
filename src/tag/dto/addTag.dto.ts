import { IsString, IsNotEmpty, IsUUID, IsOptional } from 'class-validator';

export class addTagDto {
  @IsUUID()
  @IsNotEmpty()
  pictureId!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;
}
