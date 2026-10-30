import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { TemplatesModule } from './templates/templates.module.js';
import { ContactsModule } from './contacts/contacts.module.js';
import { EmailsModule } from './emails/emails.module.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TemplatesModule, 
    ContactsModule, 
    EmailsModule,

    // load the configuration module globally (loads and parse .env)
    ConfigModule.forRoot({
      // meaning the configModule is imported in all modules of the application, no need to add it manually
      isGlobal: true,
    }),

    // Connect to the database async
    TypeOrmModule.forRootAsync({
      // these will be used forRoot, since these data we hardcode ourselves but cannot be commited, since git will leak the db pwd (credential)
      // type: 'postgres',
      // host: ...
      // port: ...
      // username: ...
      // password: ...
      // database: ...
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get('DATABASE_URL'),
        autoLoadEntities: true,
        synchronize: true,
      })
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
