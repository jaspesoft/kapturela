import { Controller, Get, Post, Req, Body, UsePipes, Res, HttpStatus } from '@nestjs/common';
import { SettingsService } from './configure.service';
import { adm_country, adm_user } from './models/settings.interface';

@Controller('api/v1/settings')
export class SettingsController {

    constructor(private service: SettingsService) { }

    @Post('create/account/')
    async createAccount(@Body() user: adm_user, @Res() res) {
        if (this.service.create(user)) {
            res.status(HttpStatus.CREATED).json({
                'message': 'welcome',
            });
        }

    }

    @Get('countries')
    async getCountries(): Promise<adm_country[]> {
        return this.service.countries();
    }
}
