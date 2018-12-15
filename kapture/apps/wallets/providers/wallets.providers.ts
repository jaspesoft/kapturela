import {Connection} from 'mongoose';
import {
    AccountSchema,
    AccountSettingSchema,
    WalletSchema,
    TransactionSchema,
    UnspentAddressSchema,
    WithdrawalRequestSchema,
} from '../models/wallets.schema';

export const walletsProviders = [
    {
        provide: 'AccountModel',
        useFactory: (connection: Connection) => connection.model('wal_accounts', AccountSchema),
        inject: ['DataBaseConnection'],
    },
    {
        provide: 'SettingAccountModel',
        useFactory: (connection: Connection) => connection.model('wal_settings_accounts', AccountSettingSchema),
        inject: ['DataBaseConnection'],
    },
    {
        provide: 'WalletModel',
        useFactory: (connection: Connection) => connection.model('wal_wallets', WalletSchema),
        inject: ['DataBaseConnection'],
    },
    {
        provide: 'TransactionModel',
        useFactory: (connection: Connection) => connection.model('wal_transactions', TransactionSchema),
        inject: ['DataBaseConnection'],
    },
    {
        provide: 'UnspentAddressnModel',
        useFactory: (connection: Connection) => connection.model('wal_unspent_address', UnspentAddressSchema),
        inject: ['DataBaseConnection'],
    },
    {
        provide: 'WithdrawalRequestModel',
        useFactory: (connection: Connection) => connection.model('wal_unspent_address', WithdrawalRequestSchema),
        inject: ['DataBaseConnection'],
    },
];
