import { BadRequestException, Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { TopicService } from '../topic/topic.service';
import { QuestionService } from '../question/question.service';
import { CreateTopicDto } from '../topic/dto/create-topic.dto';
import { Topic } from '../entities/topic.entity';
import {
  getTriviaQuestionOpenAiUseCase,
  QuestionInterface,
} from './use-cases/get-trivia-question-openai.use-case';
import { CreateQuestionDto } from '../question/dto/create-question.dto';

@Injectable()
export class GptService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  constructor(
    private readonly topicService: TopicService,
    private readonly questionService: QuestionService,
  ) {}

  async getTriviaQuestion(dto: CreateTopicDto) {
    try {
      const { description } = dto;

      let topic: Topic | null;

      topic = await this.topicService.findTopic(description);

      if (!topic) {
        topic = (await this.topicService.createTopic(dto)).topic;
      }

      const maxRetries = 5;
      let gptResponse: QuestionInterface;
      let isSimilar = true;
      let attempts = 0;

      while (isSimilar && attempts < maxRetries) {
        attempts++;

        gptResponse = await getTriviaQuestionOpenAiUseCase(this.openai, dto);

        isSimilar = await this.questionService.findQuestion(
          gptResponse.question,
          topic.id,
        );
      }

      if (isSimilar) {
        throw new BadRequestException(
          `No se pudo generar una pregunta única tras ${maxRetries} intentos.`,
        );
      }

      const questionDto: CreateQuestionDto = {
        question: gptResponse!.question,
        answers: gptResponse!.answers,
        correctAnswerIndex: gptResponse!.correctAnswerIndex,
        topicId: topic.id,
      };

      const question = await this.questionService.createQuestion(questionDto);

      return question;
    } catch (error) {
      throw new Error(error);
    }
  }
}
