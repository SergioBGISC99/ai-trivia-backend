import { Module } from '@nestjs/common';
import { TopicService } from './topic.service';
import { TopicController } from './topic.controller';
import { Topic } from '../entities/topic.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [TopicController],
  providers: [TopicService],
  imports: [TypeOrmModule.forFeature([Topic])],
  exports: [TypeOrmModule, TopicService],
})
export class TopicModule {}
