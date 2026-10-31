import { DataSource } from 'typeorm';
import { Template } from '../templates/templates.entity.js';
import { base } from './ormconfig.js';

export const appDataSource = new DataSource({
  ...base,
  entities: ["'src/**/*.entity.ts']"],
  migrations: ['src/database/migrations/*.ts'],
});
