import {
  Controller,
  Post,
  Body,
  Param,
  Put,
  Get,
  Delete,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  async findAll() {
    return this.articleService.findAll();
  }

  @Get('drafts')
  async findDrafts() {
    return this.articleService.findDrafts();
  }

  @Post()
  async create(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    return this.articleService.update(id, updateArticleDto);
  }

  @Delete(':id')
  async softDelete(@Param('id') id: number) {
    return this.articleService.softDelete(id);
  }
}
