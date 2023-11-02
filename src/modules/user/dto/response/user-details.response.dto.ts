import { AddressResponseDto } from '../../../address/dto/response/address.response.dto';
import { CarDetailsResponseDto } from '../../../car/dto/response/car-details.response.dto';

export class UserDetailsResponseDto {
  id: string;
  userName: string;
  email: string;
  address: AddressResponseDto;
  age: number;
  status: boolean;
  cars: CarDetailsResponseDto[];
  createdAt: Date;
}
