import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDealReaction1761666380400 implements MigrationInterface {
    name = 'InitDealReaction1761666380400'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "public"."deal_reaction_type_enum" AS ENUM('like', 'dislike')
        `);
        await queryRunner.query(`
            CREATE TABLE "deal_reaction" (
                "id" SERIAL NOT NULL,
                "deal_id" integer NOT NULL,
                "user_id" integer NOT NULL,
                "comment_id" integer,
                "type" "public"."deal_reaction_type_enum" NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_deal_reaction_id" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "UQ_deal_user_comment" ON "deal_reaction" ("deal_id", "user_id", "comment_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "deal_reaction"
            ADD CONSTRAINT "FK_deal_reaction_deal_id" FOREIGN KEY ("deal_id") REFERENCES "deal"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "deal_reaction"
            ADD CONSTRAINT "FK_deal_reaction_user_id" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "deal_reaction"
            ADD CONSTRAINT "FK_deal_reaction_comment_id" FOREIGN KEY ("comment_id") REFERENCES "comment"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "deal_reaction" DROP CONSTRAINT "FK_deal_reaction_comment_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "deal_reaction" DROP CONSTRAINT "FK_deal_reaction_user_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "deal_reaction" DROP CONSTRAINT "FK_deal_reaction_deal_id"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."UQ_deal_user_comment"
        `);
        await queryRunner.query(`
            DROP TABLE "deal_reaction"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."deal_reaction_type_enum"
        `);
    }

}
