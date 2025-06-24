import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import { Question } from '../entities/question.entity';
import { ValidateAnswerDto } from './dto/validate-answer.dto';
import { normalize } from '../utils/normalize.utils';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepo: Repository<Question>,
  ) {}

  private readonly logger = new Logger('QuestionService');

  async createQuestion(dto: CreateQuestionDto) {
    const question = this.questionRepo.create({
      ...dto,
      topic: { id: dto.topicId },
    });

    await this.questionRepo.save(question);

    return {
      id: question.id,
      question: question.question,
      answers: question.answers,
    };
  }

  async findQuestion(question: string, topicId: string) {
    const existing = await this.questionRepo.findBy({ topic: { id: topicId } });
    const normalizedIncoming = normalize(question);

    return existing.some((q) => {
      const existingNormalized = normalize(q.question);

      return (
        existingNormalized.includes(normalizedIncoming) ||
        normalizedIncoming.includes(existingNormalized)
      );
    });
  }

  async validateAnswer(dto: ValidateAnswerDto) {
    const { answerIndex, questionId } = dto;

    const question = await this.questionRepo.findOneBy({ id: questionId });

    if (!question) {
      throw new NotFoundException('Question not found');
    }

    return {
      question: question.question,
      answers: question.answers,
      yourAnswer: answerIndex,
      correctAnswer: question.correctAnswerIndex,
      isCorrect: question.correctAnswerIndex === answerIndex,
    };
  }

  @Cron('0 0 * * *')
  async handleMonthlyCleanup() {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const deleted = await this.questionRepo.delete({
      createdAt: LessThan(oneWeekAgo),
    });

    if (deleted.affected && deleted.affected > 0) {
      this.logger.warn(
        `🧹 ${deleted.affected} preguntas eliminadas (más de 7 días de antigüedad)`,
      );
    }
  }
}
