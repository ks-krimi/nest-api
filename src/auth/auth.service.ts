import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon2 from 'argon2';
import { AuthDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

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
        },
      });
      delete newUser.password;
      return newUser;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          throw new ForbiddenException('Credential taken');
        }
      }
      throw err;
    }
  }

  async signin(dto: AuthDto) {
    // find user by email
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    // if email don't exist, throw exeption
    if (!user) throw new ForbiddenException('Credential incorrect');

    // compare user password
    const match = await argon2.verify(user.password, dto.password);
    // if password don't match, throw exeption
    if (!match) throw new ForbiddenException('Credential incorrect');
    // return user
    delete user.password;
    return user;
  }
}
