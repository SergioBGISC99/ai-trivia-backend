import { Controller, Get, Param } from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { CreateTopicDto } from 'src/topic/dto/create-topic.dto';

@Controller('gemini')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}

  @Get('question/:topic')
  getTriviaQuestion(@Param('topic') topic: string) {
    const dto: CreateTopicDto = { description: topic };
    return this.geminiService.getTriviaQuestion(dto);
  }
}
