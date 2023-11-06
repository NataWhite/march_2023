import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAvatarToUser1699288534726 implements MigrationInterface {
  name = 'AddAvatarToUser1699288534726';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "avatar"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "avatar" text`);
  }
}
