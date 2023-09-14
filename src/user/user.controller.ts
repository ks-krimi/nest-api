import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';

import { GetUser } from 'src/auth/decorator';
import { JwtAuthGuard } from 'src/auth/guard';

@UseGuards(JwtAuthGuard) // make it global
@Controller('users')
export class UserController {
  @Get('me')
  me(@GetUser() user: User) {
    return user;
  }
}
