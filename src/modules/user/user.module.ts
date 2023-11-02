import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from '@webeleon/nestjs-redis';

import { UserEntity } from '../../database/entities/user.entity';
import { AddressModule } from '../address/address.module';
import { AuthModule } from '../auth/auth.module';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    AuthModule,
    AddressModule,
    RedisModule.forRoot({
      url: 'redis://localhost:6379',
    }),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserRepository],
})
export class UserModule {}
