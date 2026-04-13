import { MinLength, IsString } from "class-validator";

export class changePasswordDto{
    @IsString()
    @MinLength(8)
    newPassword!: string;
}