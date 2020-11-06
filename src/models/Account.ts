import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import User from './User';

@Entity('accounts')
export default class Account {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    accountType: number;

    @Column()
    balance: number;

    @Column({
        default: true
    })
    isActive: boolean;

    @Column({
        default: false
    })
    inOperation: boolean;

    @ManyToOne(() => User, user => user.accounts)
    @JoinColumn({ name: 'userId' })
    user: User;
}