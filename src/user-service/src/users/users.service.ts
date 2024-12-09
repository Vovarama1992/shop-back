import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared-modules/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUserById(userId: number) {
    return this.prisma.user.findUnique({
      where: { id: userId },
    });
  }
}
