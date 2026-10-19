import { Body, Controller, Delete, Get, Param, Patch, Post, ParseIntPipe } from '@nestjs/common';
import { TemplatesService } from './templates.service.js';

@Controller('templates')
export class TemplatesController {
    constructor(private templatesService: TemplatesService) {}

    @Get() // GET /templates
    findAll() {
        return this.templatesService.findAll();
    }

    @Get(':id') // GET /templates/:id
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.templatesService.findOne(id);
    }

    @Post() // POST /templates
    create(@Body() template: { name: string, subject: string, body: string }) {
        return this.templatesService.create(template);
    }

    @Patch(':id') // PATCH /templates/:id
    update(@Param('id', ParseIntPipe) id: number, @Body() templateUpdate: { name?: string, subject?: string, body?: string }) {
        return this.templatesService.update(id, templateUpdate);
    }

    @Delete(':id') // DELETE /templates/:id
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.templatesService.remove(id);
    }

}
