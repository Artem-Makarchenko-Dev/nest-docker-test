import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsMimeType, IsString, MaxLength } from 'class-validator';

export class PresignUploadDto {
  @ApiProperty({ example: 'document.pdf', maxLength: 255 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  filename: string;

  @ApiProperty({ example: 'application/pdf' })
  @IsString()
  @IsNotEmpty()
  @IsMimeType()
  contentType: string;
}
