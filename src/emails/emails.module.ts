import { Module } from '@nestjs/common';
import { EmailsController } from './emails.controller.js';
import { EmailsService } from './emails.service.js';
import { TemplatesModule } from '../templates/templates.module.js';
import { ContactsModule } from '../contacts/contacts.module.js';

@Module({
  imports: [
    TemplatesModule,
    ContactsModule
  ],
  controllers: [EmailsController],
  providers: [EmailsService]
})
export class EmailsModule {}
