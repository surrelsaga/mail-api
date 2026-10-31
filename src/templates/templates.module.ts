import { Module } from '@nestjs/common';
import { TemplatesController } from './templates.controller.js';
import { TemplatesService } from './templates.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Template } from './templates.entity.js';

@Module({
  imports: [
    // define which repositories are registered in the scope -> later can inject TemplatesRepository into TemplatesService
    TypeOrmModule.forFeature([Template])
  ],
  controllers: [TemplatesController],
  providers: [TemplatesService],
  exports: [TemplatesService]
})
export class TemplatesModule {}
