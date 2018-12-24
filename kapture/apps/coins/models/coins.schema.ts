import * as mongoose from 'mongoose';
import Joigoose = require('joigoose');
import * as Joi from 'joi';

const options: Joi.ValidationOptions = {abortEarly: true};
const joigoose = Joigoose(mongoose, options);

/* coins */

const joiCoinSchema = Joi.object({
    symbol: Joi.string().max(4).min(3).required(),
    name_coin: Joi.string().max(60).required(),
    block_explorer: Joi.string().required(),
    block_explorer_test: Joi.string().required(),
    endpoint_balance: Joi.string().required(),
    endpoint_transaction: Joi.string().required(),
    status: Joi.boolean().default(true),
});
export const CoinShema = new mongoose.Schema(joigoose.convert(joiCoinSchema));
