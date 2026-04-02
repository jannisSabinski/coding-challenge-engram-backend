import { IsString, IsNotEmpty, IsEmail } from "class-validator";


export class createUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}