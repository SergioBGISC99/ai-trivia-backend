import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Topic } from './topic.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  question: string;

  @Column({ type: 'text', array: true })
  answers: string[];

  @Column({ type: 'int' })
  correctAnswerIndex: number;

  @ManyToOne(() => Topic, { nullable: false, onDelete: 'CASCADE' })
  topic: Topic;

  @CreateDateColumn()
  createdAt: Date;
}
