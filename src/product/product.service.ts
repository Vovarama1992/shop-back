import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { GetAllProductsDto, CreateProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllProducts(filters: GetAllProductsDto) {
    const {
      category,
      season,
      brand,
      sizeMin,
      sizeMax,
      color,
      priceMin,
      priceMax,
      discount,
    } = filters;

    const where: Prisma.ProductWhereInput = {
      category: category || undefined,
      season: season || undefined,
      brand: brand || undefined,
      color: color || undefined,
      price: {
        gte: priceMin ? priceMin : undefined,
        lte: priceMax ? priceMax : undefined,
      },
      discount: discount ? { gt: 0 } : undefined,
      size:
        sizeMin || sizeMax
          ? {
              gte: sizeMin ? String(sizeMin) : undefined,
              lte: sizeMax ? String(sizeMax) : undefined,
            }
          : undefined,
    };

    return await this.prisma.product.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  async createProduct(productDto: CreateProductDto) {
    const newProduct = await this.prisma.product.create({
      data: productDto,
    });
    return { message: 'Product created', product: newProduct };
  }

  async getProductById(id: string) {
    return await this.prisma.product.findUnique({
      where: { id: parseInt(id, 10) },
    });
  }
}
