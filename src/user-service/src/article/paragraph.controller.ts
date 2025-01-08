import { Controller, Post, Body, Param, Put } from '@nestjs/common';
import { ParagraphService } from './paragraph.service';
import { CreateParagraphDto } from './dto/create-paragraph.dto';
import { UpdateParagraphDto } from './dto/update-paragraph.dto';

@Controller('paragraphs')
export class ParagraphController {
  constructor(private readonly paragraphService: ParagraphService) {}

  @Post()
  async create(@Body() createParagraphDto: CreateParagraphDto) {
    return this.paragraphService.create(createParagraphDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateParagraphDto: UpdateParagraphDto,
  ) {
    return this.paragraphService.update(Number(id), updateParagraphDto);
  }
}
