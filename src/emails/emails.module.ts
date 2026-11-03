import { Module } from '@nestjs/common';
import { EmailsController } from './emails.controller.js';
import { EmailsService } from './emails.service.js';
import { TemplatesModule } from '../templates/templates.module.js';
import { ContactsModule } from '../contacts/contacts.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Email } from './emails.entity.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([Email]),
    TemplatesModule,
    ContactsModule
  ],
  controllers: [EmailsController],
  providers: [EmailsService]
})
export class EmailsModule {}
