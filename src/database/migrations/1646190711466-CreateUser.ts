import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUser1646190711466 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(new Table({
            name: "user",
            columns:[
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                  },
        
                {
                    name: 'firstName',
                    type: 'varchar',
                    isNullable: false,
                  },
        
            ]
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user');
    }

}
