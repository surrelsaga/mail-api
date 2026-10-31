import 'dotenv/config';
import type { DataSourceOptions } from 'typeorm';

// this is just a shared config object for both the app module and the dataSource
export const base: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
//   entities: [import.meta.dirname + '/../**/*.entity{.ts,.js}'],

//  entities will be registered in the dataSource instead, so the format is easier to understand + only the CLI needs to know the entities so it
//  can compare against the remote DB
  synchronize: false,
};
