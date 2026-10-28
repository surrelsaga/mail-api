import { Body, Controller, Get, ParseIntPipe, Post, Query } from '@nestjs/common';
import { EmailsService } from './emails.service.js';
import { CreateEmailDto } from './dto/create-email.dto.js'

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
    findAll(@Query('status') status?: string, @Query('contactId', ParseIntPipe) contactId?: number) {
        return this.emailsService.findAll(status, contactId ? contactId : undefined);
    }

    @Post()
    create(@Body() createEmailDto: CreateEmailDto) {
        return this.emailsService.create(createEmailDto);
    }
}
