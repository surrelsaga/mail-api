import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ContactsService } from './contacts.service.js';

@Controller('contacts')
export class ContactsController {
    constructor(private readonly contactsService: ContactsService) {}

    @Get() // GET /contacts
    findAll() {
        return this.contactsService.findAll();
    }

    @Get(':id') //GET /contacts/:id
    findOne(@Param('id') id: string) {
        return this.contactsService.findOne(+id);
    }

    @Post() // POST /contacts
    create(@Body() contact: { name: string, email: string }) {
        return this.contactsService.create(contact);
    }

    @Patch(':id') // PATCH /contacts/:id
    update(@Param('id') id: string, @Body() contactUpdate: { name?: string, email?: string }) {
        return this.contactsService.update(+id, contactUpdate);
    }

    @Delete(':id') // DELETE /contacts/:id
    remove(@Param('id') id: string) {
        return this.contactsService.remove(+id);
    }
}
