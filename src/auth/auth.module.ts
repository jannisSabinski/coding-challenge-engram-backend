import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { BasicAuthGuard } from './basic-auth.guard'

@Module({
  imports: [UserModule], 
  providers: [BasicAuthGuard],
  exports: [BasicAuthGuard, AuthModule],
})
export class AuthModule {}
