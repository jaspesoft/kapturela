import {Connection} from 'mongoose';
import { AccountShema, AccountSettingShema, WalletShema, TransactionShema } from '../models/wallets.schema';

export const walletsProviders = [
    {
        provide: 'AccountModel',
        useFactory: (connection: Connection) => connection.model('wal_accounts', AccountShema),
        inject: ['DataBaseConnection'],
    },
    {
        provide: 'SettingAccountModel',
        useFactory: (connection: Connection) => connection.model('wal_settings_accounts', AccountSettingShema),
        inject: ['DataBaseConnection'],
    },
    {
        provide: 'WalletModel',
        useFactory: (connection: Connection) => connection.model('wal_wallets', WalletShema),
        inject: ['DataBaseConnection'],
    },
    {
        provide: 'TransactionModel',
        useFactory: (connection: Connection) => connection.model('wal_transactions', TransactionShema),
        inject: ['DataBaseConnection'],
    },
];
