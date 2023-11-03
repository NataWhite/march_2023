import * as path from 'node:path';

import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';

import { CustomConfigModule } from './config.module';
import { CustomConfigService } from './config.service';

export const typeOrmConfig: TypeOrmModuleAsyncOptions = {
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
      entities: [path.join(__dirname, 'database', '**', '*.entity{.ts,.js}')],
    };
  },
  inject: [CustomConfigService],
};
