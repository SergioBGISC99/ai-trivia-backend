import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { CustomJwtModule } from './jwt/jwt.module';
import { CustomPassportModule } from './passport/passport.module';
import { AuthModule } from './auth/auth.module';
import { TopicModule } from './topic/topic.module';

@Module({
  imports: [
    DatabaseModule,
    CustomJwtModule,
    CustomPassportModule,
    AuthModule,
    TopicModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
