import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTopicDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'One Piece' })
  description: string;
}
