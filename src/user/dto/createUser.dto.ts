import { IsString, IsNotEmpty, MinLength } from "class-validator";


export class createUserDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @MinLength(8)
  password!: string;
}