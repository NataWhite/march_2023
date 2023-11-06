import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAddressEntity1698954774193 implements MigrationInterface {
  name = 'AddAddressEntity1698954774193';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "address" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "city" text NOT NULL, "userId" uuid, CONSTRAINT "REL_d25f1ea79e282cc8a42bd616aa" UNIQUE ("userId"), CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "address" ADD CONSTRAINT "FK_d25f1ea79e282cc8a42bd616aa3" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "address" DROP CONSTRAINT "FK_d25f1ea79e282cc8a42bd616aa3"`,
    );
    await queryRunner.query(`DROP TABLE "address"`);
  }
}
