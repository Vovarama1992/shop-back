import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateParagraphDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsNumber()
  @IsOptional()
  order?: number;

  @IsString()
  @IsOptional()
  imageUrl?: string;
}
