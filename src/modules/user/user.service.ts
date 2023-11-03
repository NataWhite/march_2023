import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { InjectRedisClient, RedisClient } from '@webeleon/nestjs-redis';
import * as bcrypt from 'bcrypt';
import { EntityManager } from 'typeorm';

import { IList } from '../../common/interface/list.interface';
import { AddressEntity } from '../../database/entities/address.entity';
import { UserEntity } from '../../database/entities/user.entity';
import { AuthService } from '../auth/auth.service';
import { UserLoginDto } from './dto/request/user-base.request.dto';
import { UserCreateRequestDto } from './dto/request/user-create.request.dto';
import { UserListQueryRequestDto } from './dto/request/user-list-query.request.dto';
import { UserUpdateRequestDto } from './dto/request/user-update.request.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  private logger = new Logger();
  private salt = 5;
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
    @InjectRedisClient() private redisClient: RedisClient,
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}

  public async getAllUsers(
    query: UserListQueryRequestDto,
  ): Promise<IList<UserEntity>> {
    return await this.userRepository.getAllUsers(query);
  }

  public async createUser(dto: UserCreateRequestDto): Promise<UserEntity> {
    return await this.entityManager.transaction(async (em) => {
      const userRepository = em.getRepository(UserEntity);
      const addressRepository = em.getRepository(AddressEntity);

      const findUser = await userRepository.findOneBy({
        email: dto.email,
      });
      if (findUser) {
        throw new BadRequestException('User already exist');
      }
      const password = await bcrypt.hash(dto.password, this.salt);

      const user = await userRepository.save(
        userRepository.create({
          ...dto,
          password,
        }),
      );
      await addressRepository.save(addressRepository.create({ ...dto, user }));
      this.logger.log(JSON.stringify(user, null, 2));

      return await userRepository.findOne({
        where: { id: user.id },
        relations: { address: true },
      });
    });
  }

  public async getUserById(userId: string): Promise<UserEntity> {
    await this.findUserByIdOrException(userId);
    return await this.userRepository.findOne({
      where: { id: userId },
      relations: { cars: true },
    });
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

  async login(data: UserLoginDto) {
    const findUser = await this.userRepository.findOne({
      where: { email: data.email },
    });
    if (!findUser) {
      throw new HttpException(
        'Email or password is not correct',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const isCompare = await bcrypt.compare(data.password, findUser.password);
    if (!isCompare) {
      throw new HttpException(
        'Email or password is not correct',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = await this.authService.signIn({
      id: findUser.id,
    });

    await this.redisClient.setEx(token, 10000, token);
    // await this.redisClient.setEx(
    //   this.RedisPrefixKeyCarData + data.email,
    //   10000,
    //   token,
    // );

    return { token };
  }
}
