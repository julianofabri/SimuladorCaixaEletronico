import { Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany, JoinColumn } from 'typeorm';
import Account from './Account';

@Entity('users')
@Unique(['CPF'])
export default class User {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    birthDate: Date;

    @Column()
    CPF: number;

    @Column({
        default: true
    })
    isActive: boolean;

    @OneToMany(() => Account, account => account.user, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({ name: 'userId' })
    accounts: Account[];
}