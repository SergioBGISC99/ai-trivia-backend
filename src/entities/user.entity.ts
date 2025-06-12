import { ValidRoles } from '../auth/enums/valid-roles.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullname: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column('bool', {
    default: true,
  })
  isActive: boolean;

  @Column({ type: 'enum', enum: ValidRoles, default: ValidRoles.user })
  role: string;
}
