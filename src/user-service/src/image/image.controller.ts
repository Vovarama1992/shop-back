import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Get,
  Param,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import { Response } from 'express';

@Controller('images')
export class ImageController {
  constructor() {}

  @Post('upload-article/:id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const dest = path.join(__dirname, '../../images/articles');
          if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
          }
          cb(null, dest);
        },
        filename: (req, file, cb) => {
          const articleId = req.params.id;
          const filename = `${articleId}${path.extname(file.originalname)}`;
          cb(null, filename);
        },
      }),
    }),
  )
  async uploadArticleImage(@UploadedFile() file: Express.Multer.File) {
    const imagePath = `/images/articles/${file.filename}`;
    return { message: 'Image uploaded successfully', imagePath };
  }

  @Post('upload-paragraph/:id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const dest = path.join(__dirname, '../../images/paragraphs');
          if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
          }
          cb(null, dest);
        },
        filename: (req, file, cb) => {
          const paragraphId = req.params.id;
          const filename = `${paragraphId}${path.extname(file.originalname)}`;
          cb(null, filename);
        },
      }),
    }),
  )
  async uploadParagraphImage(@UploadedFile() file: Express.Multer.File) {
    const imagePath = `/images/paragraphs/${file.filename}`;
    return { message: 'Image uploaded successfully', imagePath };
  }

  @Get(':type/:id')
  async getImage(
    @Param('type') type: string,
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    const files = fs.readdirSync(path.join(__dirname, '../../images', type));

    const file = files.find((file) => file.startsWith(id));

    if (file) {
      return res.sendFile(path.join(__dirname, '../../images', type, file));
    } else {
      return res.status(404).send({ message: 'Image not found' });
    }
  }
}
