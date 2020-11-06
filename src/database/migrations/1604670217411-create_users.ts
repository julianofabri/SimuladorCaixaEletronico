import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createUsers1604670217411 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'name',
                    type: 'string',
                },
                {
                    name: 'birthDate',
                    type: 'integer'
                },
                {
                    name: 'CPF',
                    type: 'integer',
                    isUnique: true
                },
                {
                    name: 'isActive',
                    type: 'boolean'
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}
