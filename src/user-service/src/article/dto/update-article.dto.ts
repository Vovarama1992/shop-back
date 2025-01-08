import { IsString, IsOptional, IsEnum } from 'class-validator';
import { Section, Composition } from '@prisma/client';

export class UpdateArticleDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(Section)
  @IsOptional()
  section?: Section;

  @IsEnum(Composition)
  @IsOptional()
  composition?: Composition;

  @IsString()
  @IsOptional()
  metaTitle?: string;

  @IsString()
  @IsOptional()
  metaDescription?: string;

  @IsString()
  @IsOptional()
  imageUrl?: string;
}
