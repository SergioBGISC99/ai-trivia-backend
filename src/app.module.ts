import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { CustomJwtModule } from './jwt/jwt.module';

@Module({
  imports: [DatabaseModule, CustomJwtModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
