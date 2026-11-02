import { DataSource } from 'typeorm';
import { base } from './ormconfig.js';

// export this datasource is for the typeorm cli to see the datasource object
export const appDataSource = new DataSource({
  ...base,
  entities: ["'src/**/*.entity.ts']"],
  migrations: ['src/database/migrations/*.ts'],
});
