import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('templates')
export class TemplatesController {

    @Get() // GET /templates
    findAll() {
        return []
    }

    @Get(':id') // GET /templates/:id
    findOne(@Param('id') id: string) {
        return { id };
    }

    @Post() // POST /templates
    create(@Body() template: {}) {
        return template;
    }

    @Patch(':id') // PATCH /templates/:id
    update(@Param('id') id: string, @Body() templateUpdate: {}) {
        return { id, ...templateUpdate };
    }

    @Delete(':id') // DELETE /templates/:id
    remove(@Param('id') id: string) {
        return { id };
    }



}
