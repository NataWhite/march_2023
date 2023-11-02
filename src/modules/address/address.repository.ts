import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { AddressEntity } from '../../database/entities/address.entity';

@Injectable()
export class AddressRepository extends Repository<AddressEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(AddressEntity, dataSource.manager);
  }
}
