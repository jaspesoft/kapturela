import { Document } from 'mongoose';

// tslint:disable-next-line:class-name
export interface wal_accounts extends Document {
    readonly seed: string;
    readonly user_id: string;
    created_at: Date;
}

// tslint:disable-next-line:class-name
export interface wal_withdrawal_request extends Document {
    readonly amount: number;
    readonly address: string;
    readonly concept: string;
    readonly user_id: string;
    coin: string;
    validation_code: string;
    expires_at: Date;
}

// tslint:disable-next-line:class-name
export interface wal_wallets extends Document {
    readonly account: string;
    coin: string;
    readonly balance: number;
    child_change: number;
    child: number;
    address: string;
    testnet: boolean;
}
