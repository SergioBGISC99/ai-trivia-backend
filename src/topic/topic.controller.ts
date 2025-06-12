import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TopicService } from './topic.service';
import { ApiResponse } from '@nestjs/swagger';
import { Topic } from '../entities/topic.entity';
import { CreateTopicDto } from './dto/create-topic.dto';

@Controller('topic')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Topic created successfully',
    type: Topic,
  })
  create(@Body() dto: CreateTopicDto) {
    return this.topicService.createTopic(dto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    console.log(term);

    return this.topicService.findTopic(term);
  }
}
