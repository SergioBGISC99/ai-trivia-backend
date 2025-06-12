import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  question: string;

  @IsArray()
  @IsString({ each: true })
  answers: string[];

  @IsInt()
  @Min(0)
  correctAnswerIndex: number;

  @IsUUID()
  topicId: string;
}
