import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CarEntity } from '../../database/entities/car.entity';
import { UserModule } from '../user/user.module';
import { CarController } from './car.controller';
import { CarRepository } from './car.repository';
import { CarService } from './car.service';

@Module({
  imports: [TypeOrmModule.forFeature([CarEntity]), UserModule],
  controllers: [CarController],
  providers: [CarService, CarRepository],
  exports: [CarRepository],
})
export class CarModule {}
