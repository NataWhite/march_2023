import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import configuration from './configuration';

@Injectable()
export class CustomConfigService {
  constructor(
    @Inject(configuration.KEY)
    private readonly configs: ConfigType<typeof configuration>,
  ) {}

  get db_host(): string {
    return this.configs.db_host;
  }
  get db_port(): number {
    return this.configs.db_port;
  }
  get db_username(): string {
    return this.configs.db_username;
  }
  get db_password(): string {
    return this.configs.db_password;
  }
  get db_database(): string {
    return this.configs.db_database;
  }
}
