import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { ProductService } from './product.service';
import { GetAllProductsDto, CreateProductDto } from './dto/product.dto';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({ summary: 'Получить все продукты с фильтрацией' })
  @ApiQuery({
    type: GetAllProductsDto,
    description: 'Параметры фильтрации',
    required: false,
  })
  @ApiResponse({
    status: 200,
    description: 'Список продуктов',
    schema: {
      example: [
        {
          category: 'MEN',
          name: 'Winter Jacket',
          price: 4500,
          season: 'WINTER',
          brand: 'BrandName',
          size: 'L',
          color: 'Blue',
          discount: 15,
          insulation: 'Feather',
          imageUrl: 'https://example.com/image.jpg',
          storeIds: [1, 2],
          createdAt: '2024-12-13T12:34:56.000Z',
          updatedAt: '2024-12-13T12:34:56.000Z',
        },
      ],
    },
  })
  @Get()
  getAllProducts(@Query() filters: GetAllProductsDto) {
    return this.productService.getAllProducts(filters);
  }

  @ApiOperation({ summary: 'Создать новый продукт' })
  @ApiBody({
    type: CreateProductDto,
    description: 'Данные для создания продукта',
  })
  @ApiResponse({
    status: 201,
    description: 'Продукт успешно создан',
    schema: {
      example: {
        message: 'Product created',
        product: {
          id: 1,
          category: 'MEN',
          name: 'Winter Jacket',
          price: 4500,
          season: 'WINTER',
          brand: 'BrandName',
          size: 'L',
          color: 'Blue',
          discount: 15,
          insulation: 'Feather',
          imageUrl: 'https://example.com/image.jpg',
          storeIds: [1, 2],
          createdAt: '2024-12-13T12:34:56.000Z',
          updatedAt: '2024-12-13T12:34:56.000Z',
        },
      },
    },
  })
  @Post()
  createProduct(@Body() productDto: CreateProductDto) {
    return this.productService.createProduct(productDto);
  }

  @ApiOperation({ summary: 'Получить продукт по ID' })
  @ApiParam({ name: 'id', description: 'Идентификатор продукта', example: '1' })
  @ApiResponse({
    status: 200,
    description: 'Продукт по указанному ID',
    schema: {
      example: {
        id: 1,
        category: 'MEN',
        name: 'Winter Jacket',
        price: 4500,
        season: 'WINTER',
        brand: 'BrandName',
        size: 'L',
        color: 'Blue',
        discount: 15,
        insulation: 'Feather',
        imageUrl: 'https://example.com/image.jpg',
        storeIds: [1, 2],
        createdAt: '2024-12-13T12:34:56.000Z',
        updatedAt: '2024-12-13T12:34:56.000Z',
      },
    },
  })
  @Get(':id')
  getProductById(@Param('id') id: string) {
    return this.productService.getProductById(id);
  }
}
