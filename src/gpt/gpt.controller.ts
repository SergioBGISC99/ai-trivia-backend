import { Controller, Get, Param } from '@nestjs/common';
import { GptService } from './gpt.service';
import { CreateTopicDto } from '../topic/dto/create-topic.dto';

@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @Get('question/:topic')
  getTriviaQuestion(@Param('topic') topic: string) {
    const dto: CreateTopicDto = { description: topic };
    return this.gptService.getTriviaQuestion(dto);
  }
}
