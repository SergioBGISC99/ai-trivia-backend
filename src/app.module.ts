import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { CustomJwtModule } from './jwt/jwt.module';
import { CustomPassportModule } from './passport/passport.module';
import { AuthModule } from './auth/auth.module';
import { TopicModule } from './topic/topic.module';
import { QuestionModule } from './question/question.module';
import { GeminiModule } from './gemini/gemini.module';
import { GptModule } from './gpt/gpt.module';

@Module({
  imports: [
    DatabaseModule,
    CustomJwtModule,
    CustomPassportModule,
    AuthModule,
    TopicModule,
    QuestionModule,
    GeminiModule,
    GptModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
