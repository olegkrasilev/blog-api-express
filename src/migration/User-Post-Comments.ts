import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserPostComments1642042817760 implements MigrationInterface {
  name = 'UserPostComments1642042817760';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "comments" RENAME COLUMN "createdAt" TO "created_At"`);
    await queryRunner.query(
      `CREATE TABLE "comments" ("id" SERIAL NOT NULL,
      "comment" character varying NOT NULL,
      "created_At" TIMESTAMP NOT NULL DEFAULT now(),
      "user_id" integer,
      "post_id" integer,
      CONSTRAINT "PK_54ad44f5608f34fde3ee762d536" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "posts" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "post" character varying NOT NULL, "postCreationTime" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, CONSTRAINT "PK_0f7d0c521a27f469fbf75c81582" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "firstName" character varying, "lastName" character varying, "encryptedPassword" character varying NOT NULL, "passwordChangedAt" TIMESTAMP, "passwordResetToken" character varying, "passwordResetExpires" TIMESTAMP, CONSTRAINT "UQ_79dbe2df12cee4ff1b9cfebe1e7" UNIQUE ("email"), CONSTRAINT "PK_e328c26c2366eaec9bb27d743ce" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "comments" ADD CONSTRAINT "FK_8c0651c66ada14b475574721ebe" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "comments" ADD CONSTRAINT "FK_125887f24147865b50014bceb4f" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "posts" ADD CONSTRAINT "FK_9910a00e3a74dbede7e8a9d779f" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_9910a00e3a74dbede7e8a9d779f"`);
    await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_125887f24147865b50014bceb4f"`);
    await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_8c0651c66ada14b475574721ebe"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "posts"`);
    await queryRunner.query(`DROP TABLE "comments"`);
    await queryRunner.query(`ALTER TABLE "comments" RENAME COLUMN "created_At" TO "createdAt"`);
  }
}
