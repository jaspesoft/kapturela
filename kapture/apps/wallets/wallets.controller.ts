import {Controller, Get, HttpStatus, Res, Post, Param, Body, UseGuards} from '@nestjs/common';
import { async } from 'rxjs/internal/scheduler/async';
import {WalletsService} from './wallets.service';
import {adm_user} from '../settings/models/settings.interface';
import {wal_withdrawal_request} from './models/wallets.interface';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/v1/wallets')
export class WalletsController {
    constructor(private service: WalletsService) { }

    @Post('withdrawal/request/:coin')
    @UseGuards(AuthGuard('bearer'))
    async withdrawalRequest(@Res() res, @Param() params, @Body() withdrawalRequest: wal_withdrawal_request) {

        this.service.getValidateCoin(params.coin)
        .then( result => {

            if (result.status === 'faild') {
                return res.status(HttpStatus.EXPECTATION_FAILED).json(result);
            }

            this.service.setSaveWithdrawalRequest(withdrawalRequest, params.coin)
            .then(result => {
                return res.status(HttpStatus.OK).json(result);
            })
            .catch(err => {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
            });
        });

    }
    @Post('withdrawal/execute/')
    async withdrawalExecute() {

    }


}
