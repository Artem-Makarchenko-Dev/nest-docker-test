import { IsNotEmpty, IsMimeType, IsString, MaxLength } from 'class-validator';

export class PresignUploadDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  filename: string;

  @IsString()
  @IsNotEmpty()
  @IsMimeType()
  contentType: string;
}
