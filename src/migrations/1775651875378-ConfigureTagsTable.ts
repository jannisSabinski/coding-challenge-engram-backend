import { MigrationInterface, QueryRunner } from "typeorm";

export class ConfigureTagsTable1775651875378 implements MigrationInterface {
    name = 'ConfigureTagsTable1775651875378'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tag" RENAME COLUMN "tagContent" TO "tagName"`);
        await queryRunner.query(`ALTER TABLE "tag" RENAME CONSTRAINT "UQ_54b28f9037ad6ef8c6967dbc162" TO "UQ_334b5e2238470c6f0f124e60ccd"`);
        await queryRunner.query(`CREATE TABLE "picture_tags_tag" ("pictureId" uuid NOT NULL, "tagId" uuid NOT NULL, CONSTRAINT "PK_8397d42a4a3e8fcb6909075b8bd" PRIMARY KEY ("pictureId", "tagId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2cb51ac81644aaebadfe1d230a" ON "picture_tags_tag" ("pictureId") `);
        await queryRunner.query(`CREATE INDEX "IDX_eea03df326c9537e5435b5dab5" ON "picture_tags_tag" ("tagId") `);
        await queryRunner.query(`ALTER TABLE "picture_tags_tag" ADD CONSTRAINT "FK_2cb51ac81644aaebadfe1d230af" FOREIGN KEY ("pictureId") REFERENCES "picture"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "picture_tags_tag" ADD CONSTRAINT "FK_eea03df326c9537e5435b5dab5a" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "picture_tags_tag" DROP CONSTRAINT "FK_eea03df326c9537e5435b5dab5a"`);
        await queryRunner.query(`ALTER TABLE "picture_tags_tag" DROP CONSTRAINT "FK_2cb51ac81644aaebadfe1d230af"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_eea03df326c9537e5435b5dab5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2cb51ac81644aaebadfe1d230a"`);
        await queryRunner.query(`DROP TABLE "picture_tags_tag"`);
        await queryRunner.query(`ALTER TABLE "tag" RENAME CONSTRAINT "UQ_334b5e2238470c6f0f124e60ccd" TO "UQ_54b28f9037ad6ef8c6967dbc162"`);
        await queryRunner.query(`ALTER TABLE "tag" RENAME COLUMN "tagName" TO "tagContent"`);
    }

}
