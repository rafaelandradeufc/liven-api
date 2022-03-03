import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn} from 'typeorm';
import { User } from './User';

@Entity('address')
export class Address {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name:'public_place', type: 'varchar', length: 200 })
    publicPlace: string;

    @Column({ name:'number', type: 'int' })
    number: number;

    @Column({name:'district', type: 'varchar', length: 200 })
    district: string;

    @Column({ name:'city',type: 'varchar', length: 200 })
    city: string;

    @Column({ name:'cep', type: 'varchar', length: 10 })
    cep: number;

    @Column({ name:'country', type: 'varchar', length: 5 })
    country: string;

    @Column({ name:'is_active', type: 'boolean', default: true})
    isActive: boolean;

    @ManyToOne(() => User, user => user.addresses)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @CreateDateColumn({ name:'created_at'})
    createdAt: Date;
    
    @UpdateDateColumn({ name:'updated_at'})
    updatedAt: Date;

}