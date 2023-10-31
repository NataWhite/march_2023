import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRedisClient, RedisClient } from '@webeleon/nestjs-redis';

import { IList } from '../../common/interface/list.interface';
import { UserEntity } from '../../database/entities/user.entity';
import { AuthService } from '../auth/auth.service';
import { UserCreateRequestDto } from './dto/request/user-create.request.dto';
import { UserListQueryRequestDto } from './dto/request/user-list-query.request.dto';
import { UserUpdateRequestDto } from './dto/request/user-update.request.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  private logger = new Logger();
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
    @InjectRedisClient() private redisClient: RedisClient,
  ) {}

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
    // console.log(newUser);
    this.logger.log(JSON.stringify(newUser, null, 2));
    if (!dto.city) {
      newUser.city = 'Odessa';
    }
    await this.userRepository.save(newUser);
    return newUser;
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

  async login(data: any) {
    const findUser = await this.userRepository.findOne({
      where: { email: data.email },
    });
    if (!findUser) {
      throw new HttpException(
        'Email or password is not correct',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const token = await this.authService.signIn({
      id: findUser.id,
    });

    await this.redisClient.setEx(token, 10000, token);

    return { token };
  }
}
