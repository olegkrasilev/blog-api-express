import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';

import { UserRoleSeed } from '../database/seed/user.seed';

export class Seeds1642039438616 implements MigrationInterface {
  public async up(_: QueryRunner): Promise<any> {
    const userRoleSeed = UserRoleSeed;

    await getRepository('User').save(userRoleSeed);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
