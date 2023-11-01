import { ProducerEnum } from '../../enum/producer.enum';

export class CarDetailsResponseDto {
  id: string;
  year: number;
  price: number;
  model: string;
  producer: ProducerEnum;
  createdAt: Date;
}
