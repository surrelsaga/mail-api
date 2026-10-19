import { IsString, IsNotEmpty, IsEmail } from "class-validator";

export class CreateContactDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;
}
