import { CarEntity } from '../../database/entities/car.entity';
import { CarDetailsResponseDto } from './dto/response/car-details.response.dto';

export class CarResponseMapper {
  static toDetailsListDto(data: CarEntity[]): CarDetailsResponseDto[] {
    return data.map(this.toDetailsDto);
  }

  static toDetailsDto(data: CarEntity): CarDetailsResponseDto {
    return {
      id: data.id,
      year: data.year,
      price: data.price,
      model: data.model,
      producer: data.producer,
      createdAt: data.createdAt,
    };
  }
}
