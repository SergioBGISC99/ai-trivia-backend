import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { User } from '../entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    type: User,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiOperation({ summary: 'Registrar nuevo usuario' })
  register(@Body() dto: RegisterUserDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: 'User logged successfully',
  })
  @ApiResponse({ status: 403, description: 'Forbidden. Credentials related' })
  @ApiOperation({ summary: 'Iniciar sesión' })
  login(@Body() dto: LoginUserDto) {
    return this.authService.login(dto);
  }

  @Get('validate-token')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Validar si el token actual es válido' })
  validateToken() {
    return {
      valid: true,
    };
  }
}
