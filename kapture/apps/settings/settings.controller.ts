import { Controller, Get, Post, Req, Body, UsePipes, Res, HttpStatus } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { adm_country, adm_user } from './models/settings.interface';

@Controller('api/v1/settings')
export class SettingsController {

    constructor(private service: SettingsService) { }

    @Post('create/account/')
    async createAccount(@Body() user: adm_user) {
        return this.service.create(user);
        /*const resp = this.service.create(user).catch(error);

        if (resp === true) {
            res.status(HttpStatus.CREATED).json({
                'message': 'Welcome has been successfully registered. An email was sent with the account activation code.',
            });
        } else {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(res);
        }*/

    }

    @Get('countries')
    async getCountries(): Promise<adm_country[]> {
        return this.service.countries();
    }
}
