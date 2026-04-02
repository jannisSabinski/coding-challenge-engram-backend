import { Body, Controller, Delete, HttpCode, HttpStatus, Patch, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { changePasswordDto, createUserDto } from './dto';
import { GetUser } from 'src/decorator/get-user.decorator';
import { User } from './user.entity';
import { BasicAuthGuard } from 'src/auth/basic-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signUp')
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() dto: createUserDto): Promise<void>{
    return await this.userService.create(dto);
  }

  @Delete()
  @UseGuards(BasicAuthGuard)
  @HttpCode(HttpStatus.OK)
  async deleteUser(@GetUser()user: User): Promise<void>{
    return await this.userService.delete(user.id);
  }

  @Patch('password')
  @UseGuards(BasicAuthGuard)
  @HttpCode(HttpStatus.OK)
  async changePassword(
    @GetUser() user: User,
    @Body() dto: changePasswordDto,
  ): Promise<void> {
    return await this.userService.changePassword(user.id, dto.newPassword);
  }
}
