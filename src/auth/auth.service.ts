import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup() {
    return await this.prisma.user.findMany({ where: { id: 1 } });
  }
  signin() {
    return 'signin';
  }
}
