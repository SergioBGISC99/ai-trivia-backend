import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterUserDto) {
    const { password, ...rest } = dto;

    const existingUser = await this.userRepo.findOne({
      where: { email: rest.email },
    });

    if (existingUser) {
      throw new BadRequestException(
        'Este correo electrónico ya está registrado',
      );
    }

    const hash = await argon2.hash(password);

    const newUser = this.userRepo.create({
      ...rest,
      password: hash,
    });

    await this.userRepo.save(newUser);

    return {
      message: 'Usuario registrado correctamente',
    };
  }

  async login(dto: LoginUserDto) {
    const { email, password } = dto;

    const user = await this.userRepo.findOne({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException(
        'El correo electrónico o la contraseña son incorrectos',
      );
    }

    const isMatch = await argon2.verify(user.password, password);

    if (!isMatch) {
      throw new UnauthorizedException(
        'El correo electrónico o la contraseña son incorrectos',
      );
    }

    const payload = { id: user.id };
    const token = this.jwtService.sign(payload);

    return {
      message: `Hola, ${user.fullname}. Bienvenido a Mentify`,
      access_token: token,
    };
  }
}
