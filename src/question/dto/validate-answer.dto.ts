import { Type } from 'class-transformer';
import { IsInt, IsUUID, Min } from 'class-validator';

export class ValidateAnswerDto {
  @IsInt()
  @Min(0)
  @Type(() => Number)
  answerIndex: number;

  @IsUUID()
  questionId: string;
}
