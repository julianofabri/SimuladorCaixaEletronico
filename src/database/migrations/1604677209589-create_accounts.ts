import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createAccounts1604677209589 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(new Table({
            name: 'accounts',
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
                    name: 'userId',
                    type: 'integer',
                },
                {
                    name: 'accountType',
                    type: 'integer'
                },
                {
                    name: 'balance',
                    type: 'decimal',
                    scale: 10,
                    precision: 2

                },
                {
                    name: 'isActive',
                    type: 'boolean'
                },
                {
                    name: 'inOperation',
                    type: 'boolean'
                }
            ],
            foreignKeys: [
                {
                    name: 'userId',
                    columnNames: ['userId'],
                    referencedTableName: 'users',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable('accounts');
    }

}
