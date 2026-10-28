import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { EmailsService } from './emails.service.js';

@Controller('emails')
export class EmailsController {
    constructor(private readonly emailsService: EmailsService) {}
    // the routes
    /*
     GET /emails
     GET /emails?status=failed&contactId=1

     POST /emails
     receive json would be { templateId, contactId }
    */

    @Get()
    findAll(@Query('status') status?: string, @Query('contactId') contactId?: string) {
        return this.emailsService.findAll(status, contactId ? +contactId : undefined);
    }

    @Post()
    create(@Body() email: { templateId: number, contactId: number }) {
        return this.emailsService.create(email);
    }
}
