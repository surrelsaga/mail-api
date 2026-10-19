import { Body, Controller, Delete, Get, Param, Patch, Post, ParseIntPipe } from '@nestjs/common';
import { ContactsService } from './contacts.service.js';
import { CreateContactDto } from './dto/create-contact.dto.js';
import { UpdateContactDto } from './dto/update-contact.dto.js';

@Controller('contacts')
export class ContactsController {
    constructor(private readonly contactsService: ContactsService) {}

    @Get() // GET /contacts
    findAll() {
        return this.contactsService.findAll();
    }

    @Get(':id') //GET /contacts/:id
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.contactsService.findOne(id);
    }

    @Post() // POST /contacts
    create(@Body() createContactDto: CreateContactDto) {
        return this.contactsService.create(createContactDto);
    }

    @Patch(':id') // PATCH /contacts/:id
    update(@Param('id', ParseIntPipe) id: number, @Body() updateContactDto: UpdateContactDto) {
        return this.contactsService.update(id, updateContactDto);
    }

    @Delete(':id') // DELETE /contacts/:id
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.contactsService.remove(id);
    }
}
