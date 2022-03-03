import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, BeforeInsert, BeforeUpdate} from 'typeorm';
import { Address } from './ Address';
import * as bcryptjs from 'bcryptjs'; 

@Entity('user')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name:'first_name', type: 'varchar', length: 200 })
    firstName: string;

    @Column({ name:'last_name', type: 'varchar', length: 200 })
    lastName: string;
    
    @Column({ name:'date_of_birth', type: 'date' })
    dateOfBirth: Date;

    @Column({ name:'cpf', type: 'varchar', length: 11 })
    cpf: string;
    
    @Column({ name:'email', type: 'varchar', length: 200 })
    email: string;

    @Column({ name:'phone', type: 'varchar', length: 14 })
    phone: string;

    @Column({ name:'username', type: 'varchar', length: 200 })
    username: string;

    @Column({ name:'password', type: 'varchar', length: 256 })
    password: string;
    
    @Column({ name:'is_active', type: 'boolean', default: true })
    isActive: boolean;

    @OneToMany(() => Address, address => address.user)
    addresses: Address[];

    @CreateDateColumn({ name:'created_at'})
    createdAt: Date;
    
    @UpdateDateColumn({ name:'updated_at'})
    updatedAt: Date;

    @BeforeInsert()
    @BeforeUpdate()
    private hashPassword(): void {
      this.password = bcryptjs.hashSync(this.password, 10);
    }
  
    public compareHash(hash: string): boolean {
      return bcryptjs.compareSync(hash, this.password);
    }
  
}
