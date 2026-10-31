import 'dotenv/config';
import { DataSource } from 'typeorm';
import { Template } from '../templates/templates.entity.js';

export const appDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [Template],
  migrations: ['src/database/migrations/*.ts'],
});
