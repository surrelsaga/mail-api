import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';
import { TemplatesService } from '../templates/templates.service.js';
import { ContactsService } from '../contacts/contacts.service.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Email } from './emails.entity.js';
import { Repository } from 'typeorm';

@Injectable()
export class EmailsService implements OnModuleInit {
    private transporter: Transporter;

    constructor(
        private readonly templatesService: TemplatesService,
        private readonly contactsService: ContactsService,
        @InjectRepository(Email)
        private emailsRepository: Repository<Email>,
    ) {}

    // this hook in nestjs will help just before the app starts, these async events will be initalized to get what we want
    // account is async so cannot put under service constructor(), since it returns a Promise
    async onModuleInit() {
        const account = await nodemailer.createTestAccount();

        this.transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            // host: 'smtp.nope.test', // faking an error host, causing sendEmail to fail
            port: 587,
            auth: { user: account.user, pass: account.pass },
        });
    }

    // private emails: Email[] = [
    //     {
    //         id: 1,
    //         templateId: 1,
    //         contactId: 1,
    //         subject: 'Welcome, Alex!',
    //         body: 'Hi Alex, thanks for joining!',
    //         status: 'sent',
    //         error: null,
    //         createdAt: new Date(),
    //     },
    //     {
    //         id: 2,
    //         templateId: 1,
    //         contactId: 2,
    //         subject: 'Welcome, Bao!',
    //         body: 'Hi Bao, thanks for joining!',
    //         status: 'failed',
    //         error: 'connect ECONNREFUSED 127.0.0.1:587',
    //         createdAt: new Date(),
    //     },
    //     {
    //         id: 3,
    //         templateId: 2,
    //         contactId: 1,
    //         subject: 'Your order has shipped, Alex',
    //         body: 'Hi Alex, your order is on its way.',
    //         status: 'sent',
    //         error: null,
    //         createdAt: new Date(),
    //     },
    //     {
    //         id: 4,
    //         templateId: 4,
    //         contactId: 3,
    //         subject: 'Happy birthday, Daniel!',
    //         body: 'Hi Daniel, wishing you a great birthday!',
    //         status: 'sent',
    //         error: null,
    //         createdAt: new Date(),
    //     },
    // ];

    // private nextId = 5;

    findAll(status?: string, contactId?: number) {
        if (status && contactId) return this.emailsRepository.findBy({ status: status as 'sent' | 'failed', contactId });
        if (status) return this.emailsRepository.findBy({ status: status as 'sent' | 'failed' });
        if (contactId) return this.emailsRepository.findBy({ contactId });
        return this.emailsRepository.find();
    }

    async findOne(id: number) {
        const email = await this.emailsRepository.findOneBy({ id });

        if (!email) throw new NotFoundException(`Email ${id} not found`);

        return email;
    }

    async create(email: { templateId: number, contactId: number }) {
        // 404 if template or contact does not exist
        const template = await this.templatesService.findOne(email.templateId);
        const contact = await this.contactsService.findOne(email.contactId);

        const newEmail: Email = this.emailsRepository.create({
            templateId: template.id,
            contactId: contact.id,
            subject: template.subject.replaceAll("{{name}}", contact.name),
            body: template.body.replaceAll("{{name}}", contact.name),
            status: 'sent', // placeholder until Nodemailer is added??
            error: null,
        });

        // fake send email to the Ethereal's SMTP server, "create emai" here means we send an email
        try {
            const info = await this.transporter.sendMail({
                from: '"Mail API" <no-reply@mail-api.test>',
                to: contact.email,
                subject: newEmail.subject,
                text: newEmail.body,
            })
            console.log(nodemailer.getTestMessageUrl(info));
        } catch (err) {
            newEmail.status = 'failed';
            newEmail.error = err instanceof Error ? err.message : String(err);
            console.error(err);
        }

        return this.emailsRepository.save(newEmail);
    }
}
