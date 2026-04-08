import { IsString, IsNotEmpty, IsUUID, IsOptional } from 'class-validator';

export class addTagDto {
  @IsUUID()
  @IsOptional()
  tagId?: string;

  @IsUUID()
  @IsNotEmpty()
  pictureId!: string;

  @IsString()
  @IsOptional()
  name?: string;
}
