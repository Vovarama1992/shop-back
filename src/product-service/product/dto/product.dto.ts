import {
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsEnum,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Category, Season } from '@prisma/client';

export class GetAllProductsDto {
  @ApiProperty({
    description: 'Категория продукта (e.g., MEN, WOMEN, ACCESSORIES)',
    enum: Category,
  })
  @IsEnum(Category)
  category: Category;

  @ApiPropertyOptional({
    description: 'Сезон продукта (e.g., SPRING_SUMMER, DEMI_SEASON, WINTER)',
    enum: Season,
  })
  @IsOptional()
  @IsEnum(Season)
  season?: Season;

  @ApiPropertyOptional({ description: 'Бренд продукта' })
  @IsOptional()
  @IsString()
  brand?: string;

  @ApiPropertyOptional({ description: 'Цвет продукта' })
  @IsOptional()
  @IsString()
  color?: string;

  @ApiPropertyOptional({ description: 'Минимальная цена' })
  @IsOptional()
  @IsNumber()
  priceMin?: number;

  @ApiPropertyOptional({ description: 'Максимальная цена' })
  @IsOptional()
  @IsNumber()
  priceMax?: number;

  @ApiPropertyOptional({ description: 'Минимальный размер' })
  @IsOptional()
  @IsNumber()
  sizeMin?: number;

  @ApiPropertyOptional({ description: 'Максимальный размер' })
  @IsOptional()
  @IsNumber()
  sizeMax?: number;

  @ApiPropertyOptional({ description: 'Фильтр по наличию скидки (true/false)' })
  @IsOptional()
  @IsBoolean()
  discount?: boolean;
}

export class CreateProductDto {
  @ApiProperty({
    description: 'Категория продукта (e.g., MEN, WOMEN, ACCESSORIES)',
    enum: Category,
  })
  @IsEnum(Category)
  category: Category;

  @ApiProperty({ description: 'Название продукта' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ description: 'Описание продукта' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Сезон продукта (e.g., SPRING_SUMMER, DEMI_SEASON, WINTER)',
    enum: Season,
  })
  @IsOptional()
  @IsEnum(Season)
  season?: Season;

  @ApiPropertyOptional({ description: 'Бренд продукта' })
  @IsOptional()
  @IsString()
  brand?: string;

  @ApiProperty({ description: 'Цена продукта' })
  @IsNumber()
  price: number;

  @ApiPropertyOptional({ description: 'Скидка на продукт (в процентах)' })
  @IsOptional()
  @IsNumber()
  discount?: number;

  @ApiPropertyOptional({ description: 'Цвет продукта' })
  @IsOptional()
  @IsString()
  color?: string;

  @ApiPropertyOptional({ description: 'Размер продукта' })
  @IsOptional()
  @IsString()
  size?: string;

  @ApiPropertyOptional({ description: 'Утеплитель продукта' })
  @IsOptional()
  @IsString()
  insulation?: string;

  @ApiPropertyOptional({ description: 'URL изображения продукта' })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiPropertyOptional({
    description: 'Идентификаторы магазинов, где доступен продукт',
  })
  @IsOptional()
  storeIds?: number[];
}
