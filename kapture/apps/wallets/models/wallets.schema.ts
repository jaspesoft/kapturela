import * as mongoose from 'mongoose';
import Joigoose = require('joigoose');
import * as Joi from 'joi';

let joigoose = Joigoose(mongoose);
const options: Joi.ValidationOptions = {abortEarly: true};
joigoose = Joigoose(mongoose, options);

/* wal_accounts */
const joiAccountShema = Joi.object({
    account: Joi.string().guid().required(),
    seed: Joi.string().required(),
    created_at: Joi.date().default(Date.now()),
});
export const AccountShema = new mongoose.Schema(joigoose.convert(joiAccountShema));

/* wal_settings_accounts */
const joiAccountSettingsShema = Joi.object({
    account: Joi.string().required(),
    password_withdrawals: Joi.string().required(),
    created_at: Joi.date().default(Date.now()),
    local_currency: Joi.string().max(3),
    notify_email: Joi.boolean().default(true),
    notify_sms: Joi.boolean().default(false),
    two_factor: Joi.boolean().default(false),
});
export const AccountSettingShema = new mongoose.Schema(joigoose.convert(joiAccountSettingsShema));

/* wal_wallets */
const joiWalletShema = Joi.object({
    account: Joi.string().required(),
    coin: Joi.string().max(3).required(),
    balance: Joi.number().default(0),
    child_change: Joi.number().integer().default(0),
    child: Joi.number().integer().default(0),
    xpriv: Joi.string().base64().required(),
    xpub: Joi.string().required(),
    address: Joi.string().required(),
    testnet: Joi.boolean().default(false),
});
export const WalletShema = new mongoose.Schema(joigoose.convert(joiWalletShema));

/* wal_transactions */
const joiTransactionShema = Joi.object({
    address: Joi.string().required(),
    amount: Joi.number().positive().required(),
    tx: Joi.string().required(),
    script_pub: Joi.string().required(),
    transaction_type: Joi.string().max(1).required(),
    confirmation: Joi.boolean().required(),
    date_transaction: Joi.date().required(),
    wallet: Joi.string().required(),
});
export const TransactionShema = new mongoose.Schema(joigoose.convert(joiTransactionShema));
