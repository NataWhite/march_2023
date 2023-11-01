import { CarDetailsResponseDto } from '../../../car/dto/response/car-details.response.dto';

export class UserDetailsResponseDto {
  id: string;
  userName: string;
  email: string;
  city: string;
  age: number;
  status: boolean;
  cars: CarDetailsResponseDto[];
  createdAt: Date;
}
