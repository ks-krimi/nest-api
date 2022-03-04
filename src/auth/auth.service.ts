import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon2 from 'argon2';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(dto: AuthDto) {
    try {
      const { email, password } = dto;
      const hash = await argon2.hash(password);
      const newUser = await this.prisma.user.create({
        data: {
          email,
          password: hash,
          firstName: 'test1',
        },
      });
      delete newUser.password;
      return newUser;
    } catch (err) {
      console.log(err.message);
    }
  }

  signin() {
    return 'signin';
  }
}
