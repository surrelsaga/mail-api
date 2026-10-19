import { CreateTemplateDto } from "./create-template.dto.js";
import { PartialType } from "@nestjs/mapped-types";

export class UpdateTemplateDto extends PartialType(CreateTemplateDto) {}
