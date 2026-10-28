import { IsInt, IsNotEmpty } from "class-validator";

export class CreateEmailDto {
    @IsNotEmpty()
    @IsInt()
    templateId: number;

    @IsNotEmpty()
    @IsInt()
    contactId: number;
}
