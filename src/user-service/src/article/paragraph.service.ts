import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared-modules/prisma/prisma.service';
import { CreateParagraphDto } from './dto/create-paragraph.dto';
import { UpdateParagraphDto } from './dto/update-paragraph.dto';

@Injectable()
export class ParagraphService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createParagraphDto: CreateParagraphDto) {
    return this.prisma.paragraph.create({
      data: createParagraphDto,
    });
  }

  async update(id: number, updateParagraphDto: UpdateParagraphDto) {
    return this.prisma.paragraph.update({
      where: { id },
      data: updateParagraphDto,
    });
  }
}
