import { Body, Controller, Delete, Get, Param, Patch, Post, ParseIntPipe } from '@nestjs/common';
import { TemplatesService } from './templates.service.js';
import { CreateTemplateDto } from './dto/create-template.dto.js';
import { UpdateTemplateDto } from './dto/update-template.dto.js';

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
    create(@Body() createTemplateDto: CreateTemplateDto) {
        return this.templatesService.create(createTemplateDto);
    }

    @Patch(':id') // PATCH /templates/:id
    update(@Param('id', ParseIntPipe) id: number, @Body() updateTemplateDto: UpdateTemplateDto) {
        return this.templatesService.update(id, updateTemplateDto);
    }

    @Delete(':id') // DELETE /templates/:id
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.templatesService.remove(id);
    }

}
