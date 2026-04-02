import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTagsAndPictures1775159258824 implements MigrationInterface {
    name = 'CreateTagsAndPictures1775159258824'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tag" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "tagContent" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_54b28f9037ad6ef8c6967dbc162" UNIQUE ("tagContent"), CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "picture" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "storageName" character varying NOT NULL, "fileName" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "UQ_a2282b094c46eb2ea3b96a17341" UNIQUE ("storageName"), CONSTRAINT "PK_31ccf37c74bae202e771c0c2a38" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "picture" ADD CONSTRAINT "FK_4d301575fea97d316884209fec6" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "picture" DROP CONSTRAINT "FK_4d301575fea97d316884209fec6"`);
        await queryRunner.query(`DROP TABLE "picture"`);
        await queryRunner.query(`DROP TABLE "tag"`);
    }

}
