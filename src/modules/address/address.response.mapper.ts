import { AddressEntity } from '../../database/entities/address.entity';
import { AddressResponseDto } from './dto/response/address.response.dto';

export class AddressResponseMapper {
  static toDetailsDto(data: AddressEntity): AddressResponseDto {
    return {
      city: data.city,
    };
  }
}
