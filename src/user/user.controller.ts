import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Patch, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { changePasswordDto, createUserDto } from './dto';
import { GetUser } from 'src/decorator/get-user.decorator';
import { User } from './user.entity';
import { BasicAuthGuard } from 'src/auth/basic-auth.guard';
import { ApiBasicAuth, ApiOkResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signUp')
  @ApiOperation({ summary: 'Registriert einen neuen Benutzer' })
  @ApiResponse({ status: 201, description: 'Benutzer erfolgreich erstellt.' })
  @ApiResponse({
    status: 400,
    description: 'Benutzer existiert bereits.',
  })
  async createUser(@Body() dto: createUserDto): Promise<void> {
    return await this.userService.create(dto);
  }

  @Delete()
  @UseGuards(BasicAuthGuard)
  @ApiBasicAuth()
  @ApiOperation({ summary: 'Löscht den aktuell angemeldeten Benutzer' })
  @ApiResponse({ status: 200, description: 'Benutzer erfolgreich gelöscht.' })
  @ApiResponse({ status: 401, description: 'Nicht autorisiert.' })
  async deleteUser(@GetUser() user: User): Promise<void> {
    return await this.userService.delete(user.id);
  }

  @Patch('password')
  @UseGuards(BasicAuthGuard)
  @ApiBasicAuth()
  @ApiOperation({ summary: 'Ändert das Passwort des angemeldeten Benutzers' })
  @ApiResponse({ status: 200, description: 'Passwort erfolgreich geändert.' })
  async changePassword(
    @GetUser() user: User,
    @Body() dto: changePasswordDto,
  ): Promise<void> {
    return await this.userService.changePassword(user.id, dto.newPassword);
  }

  @Get('validate')
  @UseGuards(BasicAuthGuard)
  @ApiBasicAuth()
  @ApiOperation({
    summary: 'Prüft, ob die Basic Auth Zugangsdaten gültig sind',
  })
  @ApiOkResponse({
    description: 'Token/Credentials sind gültig',
    schema: { example: { valid: true } },
  })
  validate() {
    return { valid: true };
  }
}
