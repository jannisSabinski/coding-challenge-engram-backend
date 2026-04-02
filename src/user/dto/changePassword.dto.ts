import { IsNotEmpty, IsString } from "class-validator";

export class changePasswordDto{
    @IsString()
    @IsNotEmpty()
    newPassword: string;
}