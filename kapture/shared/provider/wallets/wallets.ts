import { Injectable } from '@nestjs/common';

import {  generateMnemonic, mnemonicToSeed  } from 'bip39';
import { Network } from 'kapture/shared/provider/wallets/network';
import { fromSeed, fromBase58 } from 'bip32';
import { payments } from 'bitcoinjs-lib';
import { environment } from 'kapture/environment/environment';
import { Base64 } from 'js-base64';

@Injectable()
export class Wallets {

    constructor(public crypto_network: Network) { }

    public static getCreateMnemonic(): string {
        return Wallets.getEncrypt(generateMnemonic());
    }

    // tslint:disable-next-line:variable-name
    private getPath(code_crypto: string, child: string, is_change = false, is_address = true) {

        if (is_change) {
            return 'm/44\'/' + code_crypto + '\'/0\'/' + '\/1\'/' + child + '';
        } else {
            if (is_address) {
                return 'm/44\'/' + code_crypto + '\'/0\'' + '/0/' + child + '';
            } else {
                return 'm/44\'/' + code_crypto + '\'/' + child + '\'';
            }
        }
    }

    private getSeed(nemonic: string, crypto: string) {
        return fromSeed(mnemonicToSeed(nemonic), this.crypto_network.getNetworkParams(crypto));
    }
    public static getEncrypt(va: string): string {
        let encrypt = va;
        for (let I = 0; I < environment.nro; I++) {
            encrypt = Base64.encode(encrypt + environment.seed);
        }
        return encrypt;
    }
    public static getDescrypt(va: string): string {
        let descrypt = va;
        for (let I = 0; I < environment.nro; I++) {
            descrypt = Base64.decode(descrypt).replace(environment.seed, '');
        }
        return descrypt;
    }

    public setCreateWallet(crypto: string, mnemonic: string) {
        const master = this.getSeed(mnemonic, crypto);

        const xprvString = master.toBase58();

        const xpubString = fromBase58(xprvString, this.crypto_network.getNetworkParams(crypto)).derivePath(
            this.getPath(this.crypto_network.getCodeCrypto(), '0', false, false),
            ).neutered().toBase58();

        return {
            xpriv: xprvString,
            xpub: xpubString,
            child: 0,
            address: this.getPaymentAddress(master, crypto, '0'),
            testnet: this.crypto_network.getTypeNetwork(),
        };
    }

    // tslint:disable-next-line:variable-name
    public getPaymentAddress(xpriv: any, crypto: string, child: string, is_change = false) {
        const x = xpriv.derivePath( this.getPath(
            this.crypto_network.getCodeCrypto(), '0', is_change),
        );
        const network = this.crypto_network.getNetworkParams(crypto);

        return payments.p2pkh({pubkey: x.publicKey, network}).address;
    }
}
