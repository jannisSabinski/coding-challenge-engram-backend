import { ApiProperty } from "@nestjs/swagger";
import { MinLength, IsString } from "class-validator";

export class changePasswordDto{
    @IsString()
    @MinLength(8)
    @ApiProperty({
        example: 'password1234',
        description: 'Neues Passwort',
      })
    newPassword!: string;
}