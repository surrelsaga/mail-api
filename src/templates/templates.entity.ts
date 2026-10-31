import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class Template {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    subject: string;

    @Column()
    body: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ type: "varchar", nullable: true })
    description: string | null;
}
