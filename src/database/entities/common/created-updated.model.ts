import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import {ApiProperty} from "@nestjs/swagger";

export abstract class CreatedUpdatedModel {
  @ApiProperty()
  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'NOW()',
  })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'NOW()',
  })
  updatedAt: Date;
}
