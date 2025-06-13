import { Module } from '@nestjs/common';
import { GptService } from './gpt.service';
import { GptController } from './gpt.controller';
import { TopicModule } from '../topic/topic.module';
import { QuestionModule } from '../question/question.module';

@Module({
  controllers: [GptController],
  providers: [GptService],
  imports: [TopicModule, QuestionModule],
})
export class GptModule {}
