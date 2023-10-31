import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CarResponseMapper } from './car.response.mapper';
import { CarService } from './car.service';
import { CarCreateRequestDto } from './dto/request/car-create.request.dto';
import { CarUpdateRequestDto } from './dto/request/car-update.request.dto';
import { CarDetailsResponseDto } from './dto/response/car-details.response.dto';

@ApiTags('Cars')
@Controller('cars')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @ApiOperation({ summary: 'Create new car' })
  @Post()
  async createCar(
    @Body() body: CarCreateRequestDto,
  ): Promise<CarDetailsResponseDto> {
    const result = await this.carService.createCar(body);
    return CarResponseMapper.toDetailsDto(result);
  }

  @ApiOperation({ summary: 'Get car by id' })
  @Get(':carId')
  async getCarById(
    @Param('carId') carId: string,
  ): Promise<CarDetailsResponseDto> {
    const result = await this.carService.getCarById(carId);
    return CarResponseMapper.toDetailsDto(result);
  }

  @ApiOperation({ summary: 'Update car by id' })
  @Put(':carId')
  async updateCar(
    @Param('carId') carId: string,
    @Body() body: CarUpdateRequestDto,
  ): Promise<CarDetailsResponseDto> {
    const result = await this.carService.updateCar(carId, body);
    return CarResponseMapper.toDetailsDto(result);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete car by id' })
  @Delete(':carId')
  async deleteCar(@Param('carId') carId: string): Promise<void> {
    await this.carService.deleteCar(carId);
  }
}
