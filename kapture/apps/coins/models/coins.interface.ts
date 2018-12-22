import { Document } from 'mongoose';

export interface cy_coins extends Document{
    readonly symbol: string;
    readonly name_coin: string;
    readonly block_explorer: string;
    readonly block_explorer_test: string;
    readonly endpoint_balance: string;
    readonly endpoint_transaction: string;
    status: boolean;
}
