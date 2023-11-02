import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { AddressEntity } from './address.entity';
import { CarEntity } from './car.entity';
import { CreatedUpdatedModel } from './common/created-updated.model';

@Entity('user')
export class UserEntity extends CreatedUpdatedModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  userName: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'int', nullable: true })
  age: number;

  @Column({ type: 'boolean', nullable: true })
  status: boolean;

  @OneToOne(() => AddressEntity, (entity) => entity.user)
  address: AddressEntity;

  @OneToMany(() => CarEntity, (entity) => entity.user)
  cars: CarEntity[];
}
