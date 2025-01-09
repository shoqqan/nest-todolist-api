import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/sign-in.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async login(dto: SignInDto) {
    const { name, password } = dto;
    const user = await this.prismaService.user.findFirst({ where: { name } });
    if (!user) {
      throw new NotFoundException();
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.name, roles: user.roles };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  async register(createUserDto: CreateUserDto) {
    const hashPass = await bcrypt.hash(createUserDto.password, 10);
    await this.prismaService.user.create({
      data: {
        ...createUserDto,
        password: hashPass,
      },
    });
    return createUserDto;
  }
}
