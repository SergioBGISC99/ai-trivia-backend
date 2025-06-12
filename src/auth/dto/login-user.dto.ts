import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  @ApiProperty({ example: 'juan@example.com' })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ example: '12345678' })
  password: string;
}
