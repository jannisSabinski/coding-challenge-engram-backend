import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, MinLength } from "class-validator";


export class createUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'John Doe',
    description: 'Der Name des Nutzers',
  })
  name!: string;

  @IsString()
  @MinLength(8)
  @ApiProperty({
    example: 'password1234',
    description: 'Das Passwort des Nutzers',
  })
  password!: string;
}