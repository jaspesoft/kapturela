import * as mongoose from 'mongoose';
import Joigoose = require('joigoose');
import * as Joi from 'joi';

const options: Joi.ValidationOptions = {abortEarly: true};
const joigoose = Joigoose(mongoose, options);

/* adm_countries */
const joiCountryShema = Joi.object({
    code_country: Joi.string().max(3).required(),
    name_country: Joi.string().required(),
});
export const CountryShema = new mongoose.Schema(joigoose.convert(joiCountryShema));

/* adm_users */
const joiUserSchema = Joi.object({
    username: Joi.string().required(),
    first_name: Joi.string().uppercase().required(),
    last_name: Joi.string().uppercase(),
    email: Joi.string().lowercase().email().required(),
    dni: Joi.number().required(),
    code_restore_password: Joi.string(),
    country: Joi.string().max(3).required(),
    password: Joi.string().required().min(8).max(150),
    date_joined: Joi.date().default(Date.now()),
    is_active: Joi.boolean().default(false),
    token: Joi.string(),
});
export const UserShema = new mongoose.Schema(joigoose.convert(joiUserSchema));

/* adm_state */

const joiStateShema = Joi.object({
    name_state: Joi.string().max(250).required(),
    country: Joi.string().max(3).required(),
});
export const StateShema = new mongoose.Schema(joigoose.convert(joiStateShema));

/* adm_cities */

const joiCityShema = Joi.object({
    name_city: Joi.string().max(250).required(),
    country: Joi.string().max(3).required(),
    state: Joi.number().required(),
});
export const CityShema = new mongoose.Schema(joigoose.convert(joiCityShema));
