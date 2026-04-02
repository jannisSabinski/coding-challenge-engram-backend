import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Picture } from './picture.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';
import { User } from 'src/user/user.entity';

@Injectable()
export class PictureService {
  private readonly supabaseClient: SupabaseClient;

  constructor(
    @InjectRepository(Picture)
    private readonly pictureRepository: Repository<Picture>,
    private readonly config: ConfigService,
  ) {
    this.supabaseClient = createClient(
      this.config.get('SUPABASE_URL')!,
      this.config.get('SUPABASE_SECRET_KEY')!,
    );
  }

  async upload(
    user: User,
    filename: string,
    buffer: Buffer,
    mimetype: string,
  ): Promise<void> {
    
    const { error } = await this.supabaseClient.storage
      .from('pictures')
      .upload(filename, buffer, { contentType: mimetype, upsert: true });

    if (error) throw new Error(`Upload failed: ${error.message}`);
  }

  async delete(filename: string): Promise<void> {
    const { error } = await this.supabaseClient.storage
      .from('pictures')
      .remove([filename]);

    if (error) throw new Error(`Delete failed: ${error.message}`);
  }
}
