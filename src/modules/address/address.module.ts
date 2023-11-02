import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AddressEntity } from '../../database/entities/address.entity';
import { AddressRepository } from './address.repository';
import { AddressService } from './address.service';

@Module({
  imports: [TypeOrmModule.forFeature([AddressEntity])],
  controllers: [],
  providers: [AddressService, AddressRepository],
  exports: [AddressRepository],
})
export class AddressModule {}
