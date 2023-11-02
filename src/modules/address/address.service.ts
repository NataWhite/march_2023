import { Injectable } from '@nestjs/common';

import { AddressRepository } from './address.repository';

@Injectable()
export class AddressService {
  constructor(private readonly addressRepository: AddressRepository) {}

  // public async getAllUsers(
  //   query: UserListQueryRequestDto,
  // ): Promise<IList<UserEntity>> {
  //   return await this.userRepository.getAllUsers(query);
  // }
}
