import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { ParagraphService } from './paragraph.service';
import { ParagraphController } from './paragraph.controller';
import { PrismaModule } from 'src/shared-modules/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ArticleController, ParagraphController],
  providers: [ArticleService, ParagraphService],
})
export class ArticleModule {}
