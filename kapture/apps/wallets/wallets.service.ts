import {Inject, Injectable} from '@nestjs/common';
import {wal_withdrawal_request} from './models/wallets.interface';
import { Model } from 'mongoose';
import {GeneralService} from '../../shared/services/general.service';
import {cy_coins} from '../coins/models/coins.interface';

@Injectable()
export class WalletsService {
    private _functions: GeneralService;
    constructor(
        @Inject('WithdrawalRequestModel') private readonly withdrawalRequestModel: Model<wal_withdrawal_request>,
        @Inject('CoinsModel') private readonly coinModel: Model<cy_coins>,
    ) { }
    async setSaveWithdrawalRequest(data: wal_withdrawal_request, coin: string): Promise<wal_withdrawal_request> {
        let date_expire: Date;
        date_expire = new Date();
        date_expire.setMinutes(date_expire.getMinutes() + 15);


        let withdrawal = new this.withdrawalRequestModel(data);
        withdrawal.validation_code = this._functions.getRandom(6);
        withdrawal.expires_at = date_expire;
        withdrawal.coin = coin;

        await withdrawal.validate();

        return withdrawal.save();
    }

    async getValidateCoin(coin: string): Promise<any> {
        const data = await this.coinModel.find({symbol: coin });
        console.log(data);
        if (data.length > 0) {
            return {
                status: 'ok',
            }

        } else {
            return {
                status: 'faild',
                message: 'Coin not support',
            }
        }
    }
}
