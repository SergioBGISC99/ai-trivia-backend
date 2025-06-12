import { Module } from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { GeminiController } from './gemini.controller';
import { TopicModule } from '../topic/topic.module';
import { QuestionModule } from '../question/question.module';

@Module({
  controllers: [GeminiController],
  providers: [GeminiService],
  imports: [TopicModule, QuestionModule],
})
export class GeminiModule {}
