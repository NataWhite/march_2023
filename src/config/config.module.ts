import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { CustomConfigService } from './config.service';
import configuration from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['environments/.env'],
      load: [configuration],
    }),
  ],
  providers: [ConfigService, CustomConfigService],
  exports: [ConfigService, CustomConfigService],
})
export class CustomConfigModule {}
