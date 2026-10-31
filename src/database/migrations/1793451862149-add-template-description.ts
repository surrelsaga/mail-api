import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTemplateDescription1793451862149 implements MigrationInterface {
    name = 'AddTemplateDescription1793451862149'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "template" ADD "description" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "template" DROP COLUMN "description"`);
    }

}
