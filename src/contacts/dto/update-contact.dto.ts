import { CreateContactDto } from "./create-contact.dto.js";
import { PartialType } from '@nestjs/mapped-types';

export class UpdateContactDto extends PartialType(CreateContactDto) {}
