import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Template } from './templates.entity.js';
import { Repository } from 'typeorm';
import { CreateTemplateDto } from './dto/create-template.dto.js';
import { UpdateTemplateDto } from './dto/update-template.dto.js';

@Injectable()
export class TemplatesService {
    // inject Templates repository: table in the remote DB
    constructor(
        @InjectRepository(Template)
        private templatesRepository: Repository<Template>
    ) {}

    async findAll(): Promise<Template[]> {
        return await this.templatesRepository.find();
    }

    async findOne(id: number): Promise<Template> {
        const template = await this.templatesRepository.findOneBy({ id });

        if (!template) throw new NotFoundException(`Template ${id} not found`);

        return template;
    }

    async create(createTemplateDto: CreateTemplateDto) {
        const newTemplate = this.templatesRepository.create(createTemplateDto);

        await this.templatesRepository.save(newTemplate);

        return newTemplate;
    }

    async update(id: number, updateTemplateDto: UpdateTemplateDto) {
        await this.findOne(id);

        await this.templatesRepository.update(
            id,
            updateTemplateDto,
        );

        // only for me to see the output, main thing is the above
        return await this.findOne(id);
    }

    async remove(id: number) {
        const removedTemplate = await this.findOne(id);

        await this.templatesRepository.delete(id);

        return removedTemplate;
    }
}
