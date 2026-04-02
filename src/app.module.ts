import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PictureModule } from './picture/picture.module';
import { TagModule } from './tag/tag.module';
import { TypeOrmModule } from '@nestjs/typeorm'; 

@Module({
  imports: [AuthModule, UserModule, PictureModule, TagModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
