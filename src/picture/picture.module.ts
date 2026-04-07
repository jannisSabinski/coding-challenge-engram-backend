import { Module } from '@nestjs/common';
import { PictureService } from './picture.service';
import { PictureController } from './picture.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Picture } from './picture.entity';
import { SupabaseModule } from 'src/supabase/supabase.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
      TypeOrmModule.forFeature([Picture]),
      SupabaseModule,
      UserModule
    ],
  controllers: [PictureController],
  providers: [PictureService],
})
export class PictureModule {}
