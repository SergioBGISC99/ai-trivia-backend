import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from '../entities/question.entity';
import { ValidateAnswerDto } from './dto/validate-answer.dto';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepo: Repository<Question>,
  ) {}

  async createQuestion(dto: CreateQuestionDto) {
    const question = this.questionRepo.create({ ...dto });

    await this.questionRepo.save(question);

    return {
      id: question.id,
      question: question.question,
      answers: question.answers,
    };
  }

  async validateAnswer(dto: ValidateAnswerDto) {
    const { answerIndex, questionId } = dto;

    const question = await this.questionRepo.findOneBy({ id: questionId });

    if (!question) {
      throw new NotFoundException('Question not found');
    }

    return { isCorrect: question.correctAnswerIndex === answerIndex };
  }
}
