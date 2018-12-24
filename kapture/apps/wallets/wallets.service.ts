import {Inject, Injectable} from '@nestjs/common';
import {wal_withdrawal_request} from './models/wallets.interface';
import { Model } from 'mongoose';
import {GeneralService} from '../../shared/services/general.service';
import {cy_coins} from '../coins/models/coins.interface';
import { adm_user } from '../settings/models/settings.interface';

@Injectable()
export class WalletsService {
    // tslint:disable-next-line:variable-name
    private _functions = new GeneralService();

    constructor(
        @Inject('WithdrawalRequestModel') private readonly withdrawalRequestModel: Model<wal_withdrawal_request>,
        @Inject('CoinsModel') private readonly coinModel: Model<cy_coins>,
        @Inject('MailerProvider') private readonly mailerProvider,
    ) { }
    // tslint:disable-next-line:variable-name
    async setSaveWithdrawalRequest(data: wal_withdrawal_request, coin: string, data_user: adm_user): Promise<any> {
        // tslint:disable-next-line:variable-name
        const date_expire = new Date();
        date_expire.setMinutes(date_expire.getMinutes() + 15);

        const withdrawal = new this.withdrawalRequestModel(data);
        const codeRandom = this._functions.getRandom(6);
        withdrawal.validation_code = codeRandom;
        withdrawal.expires_at = date_expire;
        withdrawal.coin = coin;

        await withdrawal.validate();

        return withdrawal.save((err, result) => {
            if (err !== null) {
                return err;
            }
            this.mailerProvider.sendMail(
                {
                    to: data_user.email,
                    subject: 'Withdrawal request to Kapture',
                    template: 'request_withdrawal',
                    context: {
                        username: data_user.username,
                        code: codeRandom,
                        amount: data.amount,
                        symbol: coin,
                    },
                },
              );
        });
    }

    async getValidateCoin(coin: string): Promise<any> {
        const data = await this.coinModel.find({symbol: coin });
        if (data.length > 0) {
            return {
                status: 'ok',
            };

        } else {
            return {
                status: 'faild',
                message: 'Coin not support',
            }
        }
    }
}
