import { Module } from '@nestjs/common';
import { PictureService } from './picture.service';
import { PictureController } from './picture.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Picture } from './picture.entity';
import { SupabaseModule } from 'src/supabase/supabase.module';

@Module({
  imports: [
      TypeOrmModule.forFeature([Picture]),
      SupabaseModule
    ],
  controllers: [PictureController],
  providers: [PictureService],
})
export class PictureModule {}
