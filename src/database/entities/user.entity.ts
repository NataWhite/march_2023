import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { CreatedUpdatedModel } from './common/created-updated.model';
import {ApiProperty} from "@nestjs/swagger";

@Entity('user')
export class UserEntity extends CreatedUpdatedModel {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ type: 'text', nullable: false })
  userName: string;

  @ApiProperty()
  @Column({ type: 'text', nullable: false, unique: true })
  email: string;

  @ApiProperty()
  @Column({ type: 'text', nullable: false })
  city: string;

  @ApiProperty()
  @Column({ type: 'int', nullable: false })
  age: number;

  @ApiProperty()
  @Column({ type: 'boolean', nullable: false })
  status: boolean;
}
