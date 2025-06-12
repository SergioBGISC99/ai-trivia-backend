import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'Juan Pérez' })
  fullname: string;

  @IsEmail()
  @ApiProperty({ example: 'juan@correo.com' })
  email: string;

  @MinLength(6)
  @ApiProperty({ example: '*********' })
  password: string;
}
