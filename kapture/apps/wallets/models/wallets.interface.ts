import { Document } from 'mongoose';

// tslint:disable-next-line:class-name
export interface wal_accounts extends Document {
    readonly seed: string;
    readonly user: string;
}

// tslint:disable-next-line:class-name
export interface wal_withdrawal_request extends Document {
    readonly amount: number;
    readonly address: string;
    readonly concept: string;
    coin: string,
    validation_code: string;
    expires_at: Date;
}
