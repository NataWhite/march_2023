import { ConfigService, registerAs } from '@nestjs/config';

const configService = new ConfigService();
const token = 'allConfigs';

export default registerAs(token, () => ({
  app_port: configService.get<string>('APP_PORT'),
  app_host: configService.get<string>('APP_HOST'),

  db_host: configService.get<string>('POSTGRES_HOST'),
  db_port: configService.get<number>('POSTGRES_PORT'),
  db_username: configService.get<string>('POSTGRES_USERNAME'),
  db_password: configService.get<string>('POSTGRES_PASSWORD'),
  db_database: configService.get<string>('POSTGRES_DB'),
}));
