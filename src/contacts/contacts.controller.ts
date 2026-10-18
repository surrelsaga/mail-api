import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('contacts')
export class ContactsController {

    @Get() // GET /contacts
    findAll() {
        return [];
    }

    @Get(':id') //GET /contacts/:id
    findOne(@Param('id') id: string) {
        return { id };
    }

    @Post() // POST /contacts
    create(@Body() contact: {}) {
        return contact;
    }

    @Patch(':id') // PATCH /contacts/:id
    update(@Param('id') id: string, @Body() contact: {}) {
        return { id, ...contact };
    }

    @Delete(':id') // DELETE /contacts/:id
    remove(@Param('id') id: string) {
        return { id };
    }
}
