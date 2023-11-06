import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { UserEntity } from '../../database/entities/user.entity';

@Injectable()
export class AuthService {
  private logger = new Logger();
  constructor(
    @InjectRepository(UserEntity)
    public userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(data: any, em?: EntityManager): Promise<UserEntity> {
    if (em) {
      this.userRepository = em.getRepository(UserEntity);
    }
    const user = await this.userRepository.findOne({
      where: {
        id: data.id,
      },
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async signIn(data: any): Promise<string> {
    return this.jwtService.sign(data);
  }

  async decode(token: string): Promise<any> {
    try {
      return this.jwtService.decode(token);
    } catch (err) {
      this.logger.error(err);
    }
  }
}
