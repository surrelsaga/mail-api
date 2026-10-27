import { Body, Controller, Get, Post, Query } from '@nestjs/common';

@Controller('emails')
export class EmailsController {
    // the routes
    /*
     GET /emails
     GET /emails?status=failed&contactId=1

     POST /emails
     receive json would be { templateId, contactId }
    */

    @Get()
    findAll(@Query('status') status?: string, @Query('contactId') contactId?: string) {
        if (status && contactId) return `emails with status ${status} and contactId ${contactId}`;
        if (status) return `emails with status ${status}`;
        if (contactId) return `emails with status ${contactId}`;
        return 'all emails';
    }

    @Post()
    create(@Body() email: { templateId: number, contactId: number }) {
        return `post an email ${email}`;
    }
}
