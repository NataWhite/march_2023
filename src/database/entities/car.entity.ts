import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { ProducerEnum } from '../../modules/car/enum/producer.enum';
import { CreatedUpdatedModel } from './common/created-updated.model';
import { UserEntity } from './user.entity';

@Entity('car')
export class CarEntity extends CreatedUpdatedModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  year: number;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'text' })
  model: string;

  @Column({ type: 'enum', enum: ProducerEnum })
  producer: ProducerEnum;

  @ManyToOne(() => UserEntity, (entity) => entity.cars)
  user: UserEntity;
}
