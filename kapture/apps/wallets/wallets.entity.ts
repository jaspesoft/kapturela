import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Accounts {
    @PrimaryGeneratedColumn()
    account: number;

    @Column({ length: 500 })
    seed: string;
}

// tslint:disable-next-line:max-classes-per-file
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    account: number;

    @Column({ length: 500 })
    seed: string;
}