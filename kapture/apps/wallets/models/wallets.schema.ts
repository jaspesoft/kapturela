import * as mongoose from 'mongoose';
import Joigoose = require('joigoose');
import * as Joi from 'joi';

const options: Joi.ValidationOptions = {abortEarly: true};
const joigoose = Joigoose(mongoose, options);

/* wal_accounts */
const joiAccountSchema = Joi.object({
    seed: Joi.string().required(),
    created_at: Joi.date().required(),
    user: Joi.string().alphanum().required(),
});
export const AccountSchema = new mongoose.Schema(joigoose.convert(joiAccountSchema));

/* wal_settings_accounts */
const joiAccountSettingsSchema = Joi.object({
    account: Joi.string().required(),
    password_withdrawals: Joi.string().required(),
    created_at: Joi.date().default(Date.now()),
    local_currency: Joi.string().max(3),
    notify_email: Joi.boolean().default(true),
    notify_sms: Joi.boolean().default(false),
    two_factor: Joi.boolean().default(false),
});
export const AccountSettingSchema = new mongoose.Schema(joigoose.convert(joiAccountSettingsSchema));

/* wal_wallets */
const joiWalletSchema = Joi.object({
    account: Joi.string().required(),
    coin: Joi.string().max(3).required(),
    balance: Joi.number().default(0),
    child_change: Joi.number().integer().default(0),
    child: Joi.number().integer().default(0),
    address: Joi.string().required(),
    testnet: Joi.boolean().default(false),
});
export const WalletSchema = new mongoose.Schema(joigoose.convert(joiWalletSchema));

/* wal_transactions */
const joiTransactionSchema = Joi.object({
    address: Joi.string().required(),
    amount: Joi.number().positive().required(),
    tx: Joi.string().required(),
    script_pub: Joi.string().required(),
    transaction_type: Joi.string().max(1).required(),
    confirmation: Joi.boolean().required(),
    date_transaction: Joi.date().required(),
    wallet: Joi.string().required(),
});
export const TransactionSchema = new mongoose.Schema(joigoose.convert(joiTransactionSchema));

/* wal_unspent_address */
const  joiUnspentAddressSchema = Joi.object({
    address: Joi.string().required(),
    tx: Joi.string().required(),
    script_pub: Joi.string().required(),
    amount: Joi.number().positive().required(),
    wallet: Joi.string().required(),
});
export const UnspentAddressSchema = new mongoose.Schema(joigoose.convert(joiUnspentAddressSchema));

/* wal_withdrawal_request */
const joiWithdrawalRequestSchema = Joi.object({
    coin: Joi.string().required(),
    amount: Joi.number().positive().required(),
    address: Joi.string().required(),
    validation_code: Joi.string(),
    concept: Joi.string().required(),
    status: Joi.string().max(1).default('P').required(),
    created_at: Joi.date().default(Date.now()),
    user_id: Joi.string().required(),
    expires_at: Joi.date(),
});
export const WithdrawalRequestSchema = new mongoose.Schema(joigoose.convert(joiWithdrawalRequestSchema));
