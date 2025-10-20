import { AppConfig } from '@monkedeals/graphql';
import { DatabaseConfig } from '@monkedeals/postgresql-typeorm';
import { AuthConfig } from 'src/modules/auth/config/auth-config.type';

export type AllConfigType = {
  app: AppConfig;
  database: DatabaseConfig;
  auth: AuthConfig;
};
