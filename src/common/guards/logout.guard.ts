import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InjectRedisClient, RedisClient } from '@webeleon/nestjs-redis';

@Injectable()
export class LogoutGuard implements CanActivate {
  constructor(@InjectRedisClient() private redisClient: RedisClient) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    if (request.headers && request.headers.authorization) {
      const token = request.headers.authorization.split(' ');
      if (token[0] == 'Bearer' && token[1] != '') {
        const jwtToken = token[1];
        if (!(await this.redisClient.exists(jwtToken))) {
          return false;
        } else {
          await this.redisClient.del(jwtToken);

          return true;
        }
      }
    }
    return false;
  }
}
