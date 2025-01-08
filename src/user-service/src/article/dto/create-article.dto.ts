import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsEnum,
  IsNumber,
} from 'class-validator';
import { Section, Composition } from '@prisma/client';
import { CreateParagraphDto } from './create-paragraph.dto';

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(Section)
  section: Section;

  @IsEnum(Composition)
  composition: Composition;

  @IsNumber()
  userId: number;

  @IsString()
  metaTitle: string;

  @IsString()
  metaDescription: string;

  @IsArray()
  paragraphs: CreateParagraphDto[];
}
