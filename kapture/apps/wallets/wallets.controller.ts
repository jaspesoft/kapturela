import {Controller, Get, HttpStatus, Res, Post, Param, Body, UseGuards, Inject} from '@nestjs/common';
import {WalletsService} from './wallets.service';
import {adm_user} from '../settings/models/settings.interface';
import {wal_withdrawal_request, wal_wallets} from './models/wallets.interface';
import { AuthGuard } from '@nestjs/passport';
import { Model } from 'mongoose';

@Controller('api/v1/wallets')
export class WalletsController {
    constructor(
        private service: WalletsService,
        @Inject('UserModel') private readonly userModel: Model<adm_user>,
    ) { }

    @Post('create/:coin')
    @UseGuards(AuthGuard('bearer'))
    async createWallet(@Res() res, @Param() params, @Body() createWallet: wal_wallets ) {
        this.service.getValidateCoin(params.coin)
        .then( result => {
            if (result.status === 'faild') {
                return res.status(HttpStatus.EXPECTATION_FAILED).json(result);
            }
            // validar que la cuenta no tenga una billetera creada para la crypto correspondiente
            this.service.validateExistsWallet(createWallet, params.coin)
            .then(response => {
                if (response.state === 'faild') {
                    return res.status(HttpStatus.EXPECTATION_FAILED).json(response);
                }
                this.service.setCreateWallet(createWallet, params.coin)
                .then(resul => {
                    if (result.status === 'faild') {
                        return res.status(HttpStatus.EXPECTATION_FAILED).json(resul);
                    }
                    return res.status(HttpStatus.OK).json({
                        message: 'The wallet was created successfully, we invite you to make a deposit',
                        state : 'ok',
                    });
                });
            });
        });
    }

    @Post('withdrawal/request/:coin')
    @UseGuards(AuthGuard('bearer'))
    async withdrawalRequest(@Res() res, @Param() params, @Body() withdrawalRequest: wal_withdrawal_request) {
        // validamos que el usuario exista
        // tslint:disable-next-line:variable-name
        let data_user: any;
        try {
            data_user = await this.userModel.find({_id: withdrawalRequest.user_id });
            if (data_user.length <= 0) {
                return res.status(HttpStatus.FORBIDDEN).json({message: 'The user is not registered on the platform'});
            }
        } catch (Exception) {
            return res.status(HttpStatus.FORBIDDEN).json({message: 'The user is not registered on the platform'});
        }

        this.service.getValidateCoin(params.coin)
        .then( result => {
            if (result.status === 'faild') {
                return res.status(HttpStatus.EXPECTATION_FAILED).json(result);
            }
            this.service.setSaveWithdrawalRequest(withdrawalRequest, params.coin, data_user[0])
            .then(() => {
                return res.status(HttpStatus.OK).json({message: 'An email has been sent with the validation code of your withdrawal request'});
            })
            .catch(err => {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
            });
        });

    }

    /*/@Post('withdrawal/execute/')
    @UseGuards(AuthGuard('bearer'))
    async withdrawalExecute() {

    }*/
}
