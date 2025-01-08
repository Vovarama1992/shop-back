import { Controller, Get, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request as Req } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async getMe(@Request() req: Req) {
    return this.usersService.authenticate(req);
  }
}
