import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CustomConfigService {
  constructor(private readonly configs: ConfigService) {}

  get app_port(): string {
    return this.configs.get<string>('APP_PORT');
  }
  get app_host(): string {
    return this.configs.get<string>('APP_HOST');
  }

  get db_host(): string {
    return this.configs.get<string>('POSTGRES_HOST');
  }
  get db_port(): number {
    return this.configs.get<number>('POSTGRES_PORT');
  }
  get db_username(): string {
    return this.configs.get<string>('POSTGRES_USERNAME');
  }
  get db_password(): string {
    return this.configs.get<string>('POSTGRES_PASSWORD');
  }
  get db_database(): string {
    return this.configs.get<string>('POSTGRES_DB');
  }
}
