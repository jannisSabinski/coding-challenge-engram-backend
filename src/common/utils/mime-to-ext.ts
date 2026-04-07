import { BadRequestException } from '@nestjs/common';

export function mimeToExt(mimetype: string): string {
  const map: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
  };

  const ext = map[mimetype];
  if (!ext)
    throw new BadRequestException(`Unsupported image type: ${mimetype}`);
  return ext;
}
