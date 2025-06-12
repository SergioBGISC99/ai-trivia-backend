import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { CustomJwtModule } from '../jwt/jwt.module';
import { CustomPassportModule } from '../passport/passport.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule,
    CustomPassportModule,
    CustomJwtModule,
  ],
  exports: [TypeOrmModule, JwtStrategy, CustomPassportModule],
})
export class AuthModule {}
