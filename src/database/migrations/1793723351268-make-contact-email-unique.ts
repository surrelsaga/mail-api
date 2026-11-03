import { MigrationInterface, QueryRunner } from "typeorm";

export class MakeContactEmailUnique1793723351268 implements MigrationInterface {
    name = 'MakeContactEmailUnique1793723351268'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contact" ADD CONSTRAINT "UQ_eff09bb429f175523787f46003b" UNIQUE ("email")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contact" DROP CONSTRAINT "UQ_eff09bb429f175523787f46003b"`);
    }

}
