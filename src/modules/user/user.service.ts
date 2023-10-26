import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';

import { IList } from '../../common/interface/list.interface';
import { UserEntity } from '../../database/entities/user.entity';
import { UserCreateRequestDto } from './dto/request/user-create.request.dto';
import { UserListQueryRequestDto } from './dto/request/user-list-query.request.dto';
import { UserUpdateRequestDto } from './dto/request/user-update.request.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async getAllUsers(
    query: UserListQueryRequestDto,
  ): Promise<IList<UserEntity>> {
    return await this.userRepository.getAllUsers(query);
  }

  public async createUser(dto: UserCreateRequestDto): Promise<UserEntity> {
    const findUser = await this.userRepository.findOneBy({
      email: dto.email,
    });
    if (findUser) {
      throw new BadRequestException('User already exist');
    }
    const newUser = this.userRepository.create(dto);
    if (!dto.city) {
      newUser.city = 'Odessa';
    }
    return await this.userRepository.save(newUser);
  }

  public async getUserById(userId: string): Promise<UserEntity> {
    return await this.findUserByIdOrException(userId);
  }

  public async updateUser(
    userId: string,
    dto: UserUpdateRequestDto,
  ): Promise<UserEntity> {
    const entity = await this.findUserByIdOrException(userId);
    this.userRepository.merge(entity, dto);
    return await this.userRepository.save(entity);
  }

  public async deleteUser(userId: string): Promise<void> {
    const entity = await this.findUserByIdOrException(userId);
    await this.userRepository.remove(entity);
  }

  private async findUserByIdOrException(userId: string): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new UnprocessableEntityException('User entity not found');
    }
    return user;
  }
}
