import { Body, Controller, Get, Post } from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { ApiResponse } from '@nestjs/swagger';
import { Question } from '../entities/question.entity';
import { ValidateAnswerDto } from './dto/validate-answer.dto';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Question created successfully',
    type: Question,
  })
  create(@Body() dto: CreateQuestionDto) {
    return this.questionService.createQuestion(dto);
  }

  @Get('check-answer')
  findAnswer(@Body() dto: ValidateAnswerDto) {
    return this.questionService.validateAnswer(dto);
  }
}
