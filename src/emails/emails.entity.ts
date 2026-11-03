import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Template } from "../templates/templates.entity.js";
import { Contact } from "../contacts/contacts.entity.js";

@Entity()
export class Email {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    templateId: number;

    // many to one is what makes templateId a FOREIGN KEY (this templateId references real template)
    // join column is to specify which columns to use 
    // (by default: typeorm assume we use templateId so w/o joinColumn still works but different names like idOftemplate then cannot)
    @ManyToOne(() => Template, { onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'templateId' })
    template: Template;

    @Column()
    contactId: number;

    @ManyToOne(() => Contact, { onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'contactId' })
    contact: Contact;

    @Column()
    subject: string;

    @Column()
    body: string;

    @Column({ type: 'varchar' })
    status: 'sent' | 'failed';

    @Column({ type: 'varchar', nullable: true })
    error: string | null;
    
    @CreateDateColumn()
    createdAt: Date;
}
