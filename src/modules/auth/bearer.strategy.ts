import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRedisClient, RedisClient } from '@webeleon/nestjs-redis';
import { Strategy } from 'passport-http-bearer';

import { UserEntity } from '../../database/entities/user.entity';
import { AuthService } from './auth.service';

@Injectable()
export class BearerStrategy extends PassportStrategy(Strategy, 'bearer') {
  private logger = new Logger();
  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
    @InjectRedisClient() readonly redisClient: RedisClient,
  ) {
    super();
  }

  async validate(token: string): Promise<UserEntity> {
    let user = null;
    try {
      if (!(await this.redisClient.exists(token))) {
        throw new UnauthorizedException();
      }
      await this.jwtService.verifyAsync(token);
      const decodeToken = this.jwtService.decode(token);
      user = await this.authService.validateUser(decodeToken);
    } catch (err) {
      this.logger.warn('log is there');
      this.logger.error(err);
      throw new UnauthorizedException();
    }
    return user;
  }
}
