import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { GeminiModule } from './gemini/gemini.module';
import { GptModule } from './gpt/gpt.module';
import { CustomJwtModule } from './jwt/jwt.module';
import { CustomPassportModule } from './passport/passport.module';
import { QuestionModule } from './question/question.module';
import { TopicModule } from './topic/topic.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
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
