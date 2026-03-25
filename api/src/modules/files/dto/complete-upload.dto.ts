import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CompleteUploadDto {
  @ApiProperty({
    example: 'users/1/1710000000000-document.pdf',
    description: 'Object key returned from presign',
  })
  @IsString()
  key: string;
}
