import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './tag.entity';
import { Picture } from 'src/picture/picture.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
      TypeOrmModule.forFeature([Tag, Picture]),
      AuthModule,
      UserModule
    ],
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {}
