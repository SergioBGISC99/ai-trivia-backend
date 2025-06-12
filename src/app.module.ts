import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { CustomJwtModule } from './jwt/jwt.module';
import { CustomPassportModule } from './passport/passport.module';

@Module({
  imports: [DatabaseModule, CustomJwtModule, CustomPassportModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
