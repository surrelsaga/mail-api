import { DataSource } from 'typeorm';
import { Template } from '../templates/templates.entity.js';
import { base } from './ormconfig.js';

export const appDataSource = new DataSource({
  ...base,
  entities: [Template],
  migrations: ['src/database/migrations/*.ts'],
});
