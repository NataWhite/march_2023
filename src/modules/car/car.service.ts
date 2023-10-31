import { Injectable, UnprocessableEntityException } from '@nestjs/common';

import { CarEntity } from '../../database/entities/car.entity';
import { UserRepository } from '../user/user.repository';
import { CarRepository } from './car.repository';
import { CarCreateRequestDto } from './dto/request/car-create.request.dto';
import { CarUpdateRequestDto } from './dto/request/car-update.request.dto';

@Injectable()
export class CarService {
  constructor(
    private readonly carRepository: CarRepository,
    private readonly userRepository: UserRepository,
  ) {}

  public async createCar(dto: CarCreateRequestDto): Promise<CarEntity> {
    const user = await this.userRepository.findOneBy({});
    const newCar = this.carRepository.create({ ...dto, user });
    return await this.carRepository.save(newCar);
  }

  public async getCarById(carId: string): Promise<CarEntity> {
    return await this.findCarByIdOrException(carId);
  }

  public async updateCar(
    carId: string,
    dto: CarUpdateRequestDto,
  ): Promise<CarEntity> {
    const entity = await this.findCarByIdOrException(carId);
    this.carRepository.merge(entity, dto);
    return await this.carRepository.save(entity);
  }

  public async deleteCar(carId: string): Promise<void> {
    const entity = await this.findCarByIdOrException(carId);
    await this.carRepository.remove(entity);
  }

  private async findCarByIdOrException(carId: string): Promise<CarEntity> {
    const car = await this.carRepository.findOneBy({ id: carId });
    if (!car) {
      throw new UnprocessableEntityException('Car entity not found');
    }
    return car;
  }
}
