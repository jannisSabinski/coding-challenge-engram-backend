import { IsNotEmpty, IsUUID, IsOptional } from 'class-validator';

export class removeTagDto {
  @IsUUID()
  @IsNotEmpty()
  tagId!: string;

  @IsUUID()
  @IsNotEmpty()
  pictureId!: string;
}