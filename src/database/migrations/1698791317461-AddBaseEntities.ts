import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBaseEntities1698791317461 implements MigrationInterface {
  name = 'AddBaseEntities1698791317461';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userName" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, "city" text NOT NULL, "age" integer, "status" boolean, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "car" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "year" integer NOT NULL, "price" integer NOT NULL, "model" text NOT NULL, "producer" "public"."car_producer_enum" NOT NULL, "userId" uuid, CONSTRAINT "PK_55bbdeb14e0b1d7ab417d11ee6d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "car" ADD CONSTRAINT "FK_a4f3cb1b950608959ba75e8df36" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "car" DROP CONSTRAINT "FK_a4f3cb1b950608959ba75e8df36"`,
    );
    await queryRunner.query(`DROP TABLE "car"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
