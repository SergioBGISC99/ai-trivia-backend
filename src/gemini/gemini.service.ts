import { GoogleGenAI } from '@google/genai';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTopicDto } from '../topic/dto/create-topic.dto';
import { TopicService } from '../topic/topic.service';
import { Topic } from '../entities/topic.entity';
import {
  getTriviaQuestionGeminiUseCase,
  QuestionInterface,
} from './use-cases/get-trivia-question-gemini.use-case';
import { CreateQuestionDto } from '../question/dto/create-question.dto';
import { QuestionService } from '../question/question.service';

@Injectable()
export class GeminiService {
  private ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

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

        gptResponse = await getTriviaQuestionGeminiUseCase(this.ai, dto);

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
