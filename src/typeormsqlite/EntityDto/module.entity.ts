import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class ModuleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  moduleId: number;

  @Column()
  temperature: number;

  @Column()
  humidity: number;

  @CreateDateColumn({ type: 'datetime' })
  dateTime: Date;

  @Column()
  valve: boolean;
}
