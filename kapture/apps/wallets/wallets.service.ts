import {Inject, Injectable} from '@nestjs/common';
import {wal_withdrawal_request, wal_wallets, wal_accounts} from './models/wallets.interface';
import { Model } from 'mongoose';
import {GeneralService} from '../../shared/services/general.service';
import {cy_coins} from '../coins/models/coins.interface';
import { adm_user } from '../settings/models/settings.interface';
import { Wallets } from 'kapture/shared/provider/wallets/wallets';

@Injectable()
export class WalletsService {
    // tslint:disable-next-line:variable-name
    private _functions = new GeneralService();

    constructor(
        @Inject('WalletModel') private readonly walletModel: Model<wal_wallets>,
        @Inject('WithdrawalRequestModel') private readonly withdrawalRequestModel: Model<wal_withdrawal_request>,
        @Inject('AccountModel') private readonly accounttModel: Model<wal_accounts>,
        @Inject('CoinsModel') private readonly coinModel: Model<cy_coins>,
        @Inject('MailerProvider') private readonly mailerProvider,
        private walletProvider: Wallets,
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
            };
        }
    }

    async setCreateWallet(data: wal_wallets, symbol: string): Promise<any> {
        // buscar la cuenta para tener los seed's
        // tslint:disable-next-line:variable-name
        let data_account: any;
        try {
            data_account = await this.accounttModel.find({_id: data.account});

            if (data_account.length <= 0) {
                return {
                    message: 'the account code does not exist',
                    state: 'faild',
                };
            }
            data_account = data_account[0];
        } catch (Exception) {
            return {
                message: 'the account code does not exist',
                state: 'faild',
            };
        }

        const seed = Wallets.getDescrypt(data_account.seed) + data_account.created_at;
        const wallet = this.walletProvider.setCreateWallet(symbol, seed);

        /*const newWallet = new this.walletModel(data);
        await newWallet.validate();
        return newWallet.save((err, result) => {
            if (err !== null) {
                return err;
            }
        });*/
        return wallet;
    }
}
