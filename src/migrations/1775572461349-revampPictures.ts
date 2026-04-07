import { MigrationInterface, QueryRunner } from "typeorm";

export class RevampPictures1775572461349 implements MigrationInterface {
    name = 'RevampPictures1775572461349'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "picture" DROP CONSTRAINT "UQ_a2282b094c46eb2ea3b96a17341"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "picture" ADD CONSTRAINT "UQ_a2282b094c46eb2ea3b96a17341" UNIQUE ("storageName")`);
    }

}
