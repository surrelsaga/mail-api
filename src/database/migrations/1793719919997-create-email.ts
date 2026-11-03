import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEmail1793719919997 implements MigrationInterface {
    name = 'CreateEmail1793719919997'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "email" ("id" SERIAL NOT NULL, "templateId" integer NOT NULL, "contactId" integer NOT NULL, "subject" character varying NOT NULL, "body" character varying NOT NULL, "status" character varying NOT NULL, "error" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1e7ed8734ee054ef18002e29b1c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "email" ADD CONSTRAINT "FK_77acaef2b18755ae18dd726b563" FOREIGN KEY ("templateId") REFERENCES "template"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "email" ADD CONSTRAINT "FK_792af602479d447138e5d58b63e" FOREIGN KEY ("contactId") REFERENCES "contact"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "email" DROP CONSTRAINT "FK_792af602479d447138e5d58b63e"`);
        await queryRunner.query(`ALTER TABLE "email" DROP CONSTRAINT "FK_77acaef2b18755ae18dd726b563"`);
        await queryRunner.query(`DROP TABLE "email"`);
    }

}
