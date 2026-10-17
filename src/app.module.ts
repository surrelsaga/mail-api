import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { TemplatesModule } from './templates/templates.module.js';
import { ContactsModule } from './contacts/contacts.module.js';
import { EmailsModule } from './emails/emails.module.js';

@Module({
  imports: [TemplatesModule, ContactsModule, EmailsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
