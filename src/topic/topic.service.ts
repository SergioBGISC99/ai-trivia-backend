import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Topic } from '../entities/topic.entity';
import { Repository } from 'typeorm';
import { isUUID } from 'class-validator';
import { CreateTopicDto } from './dto/create-topic.dto';

@Injectable()
export class TopicService {
  constructor(
    @InjectRepository(Topic) private readonly topicRepo: Repository<Topic>,
  ) {}

  async createTopic(dto: CreateTopicDto) {
    const { description } = dto;

    const normalizedDescription = description.toUpperCase();

    const newTopic = this.topicRepo.create({
      description: normalizedDescription,
    });
    await this.topicRepo.save(newTopic);

    return { topic: newTopic };
  }

  async findTopic(term: string) {
    let topic: Topic | null;

    if (isUUID(term)) {
      topic = await this.topicRepo.findOneBy({ id: term });
    } else {
      const queryBuilder = this.topicRepo.createQueryBuilder('topic');
      topic = await queryBuilder
        .where('UPPER(description) =:description', {
          description: term.toUpperCase(),
        })
        .getOne();
    }

    return topic;
  }
}
