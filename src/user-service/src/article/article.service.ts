import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared-modules/prisma/prisma.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ParagraphService } from './paragraph.service';

@Injectable()
export class ArticleService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly paragraphService: ParagraphService,
  ) {}

  async findAll() {
    return this.prisma.article.findMany({
      where: { draft: false },
      include: {
        paragraphs: true,
      },
    });
  }

  async findDrafts() {
    return this.prisma.article.findMany({
      where: { draft: true },
      include: {
        paragraphs: true,
      },
    });
  }

  async searchByKeyword(keyword: string) {
    return this.prisma.article.findFirst({
      where: {
        OR: [
          { title: { contains: keyword, mode: 'insensitive' } },
          { metaTitle: { contains: keyword, mode: 'insensitive' } },
          { metaDescription: { contains: keyword, mode: 'insensitive' } },
          { description: { contains: keyword, mode: 'insensitive' } },
        ],
      },
      include: {
        paragraphs: true,
      },
    });
  }

  async create(createArticleDto: CreateArticleDto) {
    const { paragraphs, ...articleData } = createArticleDto;

    const article = await this.prisma.article.create({
      data: {
        ...articleData,
        paragraphs: {
          create: paragraphs?.map((paragraph) => ({
            title: paragraph.title,
            content: paragraph.content,
            order: paragraph.order,
          })),
        },
      },
    });

    return article;
  }
  async update(id: number, updateArticleDto: UpdateArticleDto) {
    await this.prisma.article.update({
      where: { id },
      data: updateArticleDto,
    });

    return this.prisma.article.findUnique({ where: { id } });
  }

  async softDelete(id: number) {
    await this.prisma.article.update({
      where: { id },
      data: { isDeleted: true },
    });

    return { message: 'Article marked as draft' };
  }
}
