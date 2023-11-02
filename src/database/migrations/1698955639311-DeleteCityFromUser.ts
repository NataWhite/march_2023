import { MigrationInterface, QueryRunner } from 'typeorm';

export class DeleteCityFromUser1698955639311 implements MigrationInterface {
  name = 'DeleteCityFromUser1698955639311';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "city"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "city" text NOT NULL`);
  }
}
