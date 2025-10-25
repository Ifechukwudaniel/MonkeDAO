import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitSchema1761408239941 implements MigrationInterface {
  name = 'InitSchema1761408239941';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "deal_location" (
                "id" SERIAL NOT NULL,
                "address" character varying NOT NULL,
                "city" character varying NOT NULL,
                "state" character varying NOT NULL,
                "country" character varying NOT NULL,
                "lat" double precision NOT NULL,
                "lng" double precision NOT NULL,
                "distanceFromCenter" double precision,
                "deal_id" integer,
                CONSTRAINT "REL_33afea85730dfc2ffa846054ef" UNIQUE ("deal_id"),
                CONSTRAINT "PK_deal_location_id" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "deal_nft" (
                "id" SERIAL NOT NULL,
                "mintable" boolean NOT NULL DEFAULT false,
                "tokenStandard" character varying NOT NULL,
                "royaltyPercentage" double precision,
                "transferable" boolean NOT NULL DEFAULT true,
                "maxSupply" integer NOT NULL,
                "currentMinted" integer NOT NULL,
                "deal_id" integer,
                CONSTRAINT "REL_5c9e144ab6fa757456b57da5f8" UNIQUE ("deal_id"),
                CONSTRAINT "PK_deal_nft_id" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "deal_option" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "originalPrice" double precision NOT NULL,
                "discountedPrice" double precision NOT NULL,
                "available" boolean NOT NULL DEFAULT true,
                "maxGuests" integer,
                "includes" jsonb,
                "deal_id" integer,
                CONSTRAINT "PK_deal_option_id" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "tag" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                CONSTRAINT "PK_tag_id" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE UNIQUE INDEX "UQ_tag_name" ON "tag" ("name")
        `);
    await queryRunner.query(`
            CREATE TABLE "merchant" (
                "id" SERIAL NOT NULL,
                "slug" character varying NOT NULL,
                "name" character varying NOT NULL,
                "description" character varying NOT NULL DEFAULT '',
                "website" character varying,
                "logoUrl" character varying,
                "country" character varying,
                "walletAddress" character varying,
                "verifiedMerchant" boolean NOT NULL DEFAULT false,
                "city" character varying,
                "externalId" character varying,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_merchant_id" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE UNIQUE INDEX "UQ_merchant_slug" ON "merchant" ("slug")
        `);
    await queryRunner.query(`
            CREATE TABLE "deal" (
                "id" SERIAL NOT NULL,
                "slug" character varying NOT NULL,
                "title" character varying NOT NULL,
                "description" character varying NOT NULL DEFAULT '',
                "category" character varying,
                "subCategory" character varying,
                "originalPrice" integer,
                "discountedPrice" integer,
                "discountPercent" double precision,
                "currency" character varying(3),
                "externalId" character varying,
                "externalUrl" character varying,
                "imageUrl" character varying,
                "startDate" TIMESTAMP WITH TIME ZONE,
                "endDate" TIMESTAMP WITH TIME ZONE,
                "featured" boolean NOT NULL DEFAULT false,
                "active" boolean NOT NULL DEFAULT true,
                "source" character varying(50) NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "merchant_id" integer,
                CONSTRAINT "PK_deal_id" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE UNIQUE INDEX "UQ_deal_slug" ON "deal" ("slug")
        `);
    await queryRunner.query(`
            CREATE TABLE "comment" (
                "id" SERIAL NOT NULL,
                "body" text NOT NULL,
                "rating" integer NOT NULL DEFAULT '0',
                "author_id" integer NOT NULL,
                "deal_id" integer,
                "merchant_id" integer,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_comment_id" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL NOT NULL,
                "username" character varying NOT NULL,
                "email" character varying NOT NULL,
                "walletAddress" character varying,
                "image" character varying NOT NULL DEFAULT '',
                "bio" character varying NOT NULL DEFAULT '',
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_user_id" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE UNIQUE INDEX "UQ_user_username" ON "user" ("username")
        `);
    await queryRunner.query(`
            CREATE UNIQUE INDEX "UQ_user_email" ON "user" ("email")
        `);
    await queryRunner.query(`
            CREATE TABLE "merchant_to_tag" (
                "merchant_id" integer NOT NULL,
                "tag_id" integer NOT NULL,
                CONSTRAINT "PK_9d653c2906f6b80def30ca0eac3" PRIMARY KEY ("merchant_id", "tag_id")
            )
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_37839dde6a038edac566afdcc1" ON "merchant_to_tag" ("merchant_id")
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_16ded71d557e38a7ff737a1fc8" ON "merchant_to_tag" ("tag_id")
        `);
    await queryRunner.query(`
            CREATE TABLE "deal_to_tag" (
                "deal_id" integer NOT NULL,
                "tag_id" integer NOT NULL,
                CONSTRAINT "PK_a3f14e4a3981a2e0eb91898c17a" PRIMARY KEY ("deal_id", "tag_id")
            )
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_2c42787c267cf3885936190e44" ON "deal_to_tag" ("deal_id")
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_ac162d9d841e80ef045529d0d8" ON "deal_to_tag" ("tag_id")
        `);
    await queryRunner.query(`
            ALTER TABLE "deal_location"
            ADD CONSTRAINT "FK_deal_location_deal" FOREIGN KEY ("deal_id") REFERENCES "deal"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "deal_nft"
            ADD CONSTRAINT "FK_deal_nft_deal" FOREIGN KEY ("deal_id") REFERENCES "deal"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "deal_option"
            ADD CONSTRAINT "FK_deal_option_deal" FOREIGN KEY ("deal_id") REFERENCES "deal"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "deal"
            ADD CONSTRAINT "FK_deal_merchant" FOREIGN KEY ("merchant_id") REFERENCES "merchant"("id") ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "comment"
            ADD CONSTRAINT "FK_comment_user" FOREIGN KEY ("author_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "comment"
            ADD CONSTRAINT "FK_comment_deal" FOREIGN KEY ("deal_id") REFERENCES "deal"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "comment"
            ADD CONSTRAINT "FK_comment_merchant" FOREIGN KEY ("merchant_id") REFERENCES "merchant"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "merchant_to_tag"
            ADD CONSTRAINT "FK_merchant_to_tag_merchant" FOREIGN KEY ("merchant_id") REFERENCES "merchant"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "merchant_to_tag"
            ADD CONSTRAINT "FK_merchant_to_tag_tag" FOREIGN KEY ("tag_id") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "deal_to_tag"
            ADD CONSTRAINT "FK_deal_to_tag_deal" FOREIGN KEY ("deal_id") REFERENCES "deal"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "deal_to_tag"
            ADD CONSTRAINT "FK_deal_to_tag_tag" FOREIGN KEY ("tag_id") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "deal_to_tag" DROP CONSTRAINT "FK_deal_to_tag_tag"
        `);
    await queryRunner.query(`
            ALTER TABLE "deal_to_tag" DROP CONSTRAINT "FK_deal_to_tag_deal"
        `);
    await queryRunner.query(`
            ALTER TABLE "merchant_to_tag" DROP CONSTRAINT "FK_merchant_to_tag_tag"
        `);
    await queryRunner.query(`
            ALTER TABLE "merchant_to_tag" DROP CONSTRAINT "FK_merchant_to_tag_merchant"
        `);
    await queryRunner.query(`
            ALTER TABLE "comment" DROP CONSTRAINT "FK_comment_merchant"
        `);
    await queryRunner.query(`
            ALTER TABLE "comment" DROP CONSTRAINT "FK_comment_deal"
        `);
    await queryRunner.query(`
            ALTER TABLE "comment" DROP CONSTRAINT "FK_comment_user"
        `);
    await queryRunner.query(`
            ALTER TABLE "deal" DROP CONSTRAINT "FK_deal_merchant"
        `);
    await queryRunner.query(`
            ALTER TABLE "deal_option" DROP CONSTRAINT "FK_deal_option_deal"
        `);
    await queryRunner.query(`
            ALTER TABLE "deal_nft" DROP CONSTRAINT "FK_deal_nft_deal"
        `);
    await queryRunner.query(`
            ALTER TABLE "deal_location" DROP CONSTRAINT "FK_deal_location_deal"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_ac162d9d841e80ef045529d0d8"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_2c42787c267cf3885936190e44"
        `);
    await queryRunner.query(`
            DROP TABLE "deal_to_tag"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_16ded71d557e38a7ff737a1fc8"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_37839dde6a038edac566afdcc1"
        `);
    await queryRunner.query(`
            DROP TABLE "merchant_to_tag"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."UQ_user_email"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."UQ_user_username"
        `);
    await queryRunner.query(`
            DROP TABLE "user"
        `);
    await queryRunner.query(`
            DROP TABLE "comment"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."UQ_deal_slug"
        `);
    await queryRunner.query(`
            DROP TABLE "deal"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."UQ_merchant_slug"
        `);
    await queryRunner.query(`
            DROP TABLE "merchant"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."UQ_tag_name"
        `);
    await queryRunner.query(`
            DROP TABLE "tag"
        `);
    await queryRunner.query(`
            DROP TABLE "deal_option"
        `);
    await queryRunner.query(`
            DROP TABLE "deal_nft"
        `);
    await queryRunner.query(`
            DROP TABLE "deal_location"
        `);
  }
}
