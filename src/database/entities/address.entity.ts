import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CreatedUpdatedModel } from './common/created-updated.model';
import { UserEntity } from './user.entity';

@Entity('address')
export class AddressEntity extends CreatedUpdatedModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  city: string;

  @OneToOne(() => UserEntity, (entity) => entity.address)
  @JoinColumn()
  user: UserEntity;
}
