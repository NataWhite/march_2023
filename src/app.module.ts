import * as path from 'node:path';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CustomConfigModule } from './config/config.module';
import { CustomConfigService } from './config/config.service';
import { AddressModule } from './modules/address/address.module';
import { AuthModule } from './modules/auth/auth.module';
import { CarModule } from './modules/car/car.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    CustomConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [CustomConfigModule],
      useFactory: (customConfigService: CustomConfigService) => {
        return {
          type: 'postgres',
          host: customConfigService.db_host,
          port: customConfigService.db_port,
          username: customConfigService.db_username,
          password: customConfigService.db_password,
          database: customConfigService.db_database,
          synchronize: false,
          migrationsRun: false,
          entities: [
            path.join(__dirname, 'database', '**', '*.entity{.ts,.js}'),
          ],
        };
      },
      inject: [CustomConfigService],
    }),
    AuthModule,
    AddressModule,
    UserModule,
    CarModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
