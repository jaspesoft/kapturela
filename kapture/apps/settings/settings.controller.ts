import { Controller, Get, Post, Req, Body, UsePipes, Res, HttpStatus } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { adm_country, adm_user } from './models/settings.interface';

@Controller('api/v1/settings')
export class SettingsController {

    constructor(private service: SettingsService) { }

    @Post('create/account/')
    async createAccount(@Body() user: adm_user, @Res() res) {
        // validar que el usaurio no este registrado
        this.service.validarUser(user.email, user.username)
        .then(result => {
            if (result.status === 'faild') {
                return res.status(HttpStatus.OK).json({
                    message: result.message,
                });
            }
            this.service.create(user)
            .then(() => {
                res.status(HttpStatus.CREATED).json({
                    message: 'Welcome has been successfully registered. An email was sent with the account activation code.',
                });
            })
            .catch(error => {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
            });
        });

    }

    @Get('countries')
    async getCountries(): Promise<adm_country[]> {
        return this.service.countries();
    }
}
