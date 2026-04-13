import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private readonly client: SupabaseClient;

  constructor(private readonly config: ConfigService) {
    this.client = createClient(
      this.config.get<string>('SUPABASE_URL')!,
      this.config.get<string>('SUPABASE_SECRET_KEY')!,
    );
  }

  async upload(
    filename: string,
    buffer: Buffer,
    mimetype: string,
  ): Promise<void> {
    const { error } = await this.client.storage
      .from('pictures')
      .upload(filename, buffer, { contentType: mimetype, upsert: false });

    if (error) throw new Error(`Upload failed: ${error.message}`);
  }

  async update(
    filename: string,
    buffer: Buffer,
    mimetype: string,
  ): Promise<void> {
    const { error } = await this.client.storage
      .from('pictures')
      .update(filename, buffer, { contentType: mimetype, upsert: true });

    if (error) throw new Error(`Update failed: ${error.message}`);
  }

  getPublicUrl(): string {
    const { data } = this.client.storage
      .from('pictures')
      .getPublicUrl('');
    return data.publicUrl;
  }

  async delete(filename: string): Promise<void> {
    const { error } = await this.client.storage
      .from('pictures')
      .remove([filename]);

    if (error) throw new Error(`Delete failed: ${error.message}`);
  }
}
