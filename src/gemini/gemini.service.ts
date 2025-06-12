import { GoogleGenAI } from '@google/genai';
import { Injectable } from '@nestjs/common';
import { CreateTopicDto } from '../topic/dto/create-topic.dto';
import { TopicService } from '../topic/topic.service';
import { Topic } from '../entities/topic.entity';
import { getTriviaQuestionUseCase } from './use-cases/get-trivia-question.use-case';
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

      const geminiResponse = await getTriviaQuestionUseCase(this.ai, dto);

      const questionDto: CreateQuestionDto = {
        question: geminiResponse.question,
        answers: geminiResponse.answers,
        correctAnswerIndex: geminiResponse.correctAnswerIndex,
        topicId: topic.id,
      };

      const question = await this.questionService.createQuestion(questionDto);

      return question;
    } catch (error) {
      throw new Error(error);
    }
  }
}
