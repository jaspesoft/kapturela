import { Injectable } from '@nestjs/common';

import {  generateMnemonic, mnemonicToSeed  } from 'bip39';
import { Network } from 'kapture/shared/provider/network';
import { fromSeed, fromBase58 } from 'bip32';
import { payments } from 'bitcoinjs-lib';

@Injectable()
export class WalletsProvider {
    // tslint:disable-next-line:variable-name
    private crypto_network;

    constructor() {
        this.crypto_network = new Network();
    }

    private getPath(code_crypto: string, child: string, is_change = false) {
        if (is_change) {
            return 'm/44\'/' + code_crypto + '\'/1\'/' + child + '';
        } else {
            return 'm/44\'/' + code_crypto + '\'/0\'/' + child + '';
        }
    }

    private getSeed(nemonic: string, crypto: string) {
        return fromSeed(mnemonicToSeed(nemonic), this.crypto_network.getNetworkParams(crypto));
    }

    public setGenerateAccount(crypto: string) {
        //const seed = generateMnemonic();

        const seed = 'toddler above spend fat ketchup actual winter pupil relax real humor admit';

        //const master = this.getSeed(seed, crypto);
        const master = this.getSeed(seed, crypto);

        const xprvString = master.toBase58();

        const xpubString = fromBase58(xprvString, this.crypto_network.getNetworkParams(crypto)).derivePath(
            this.getPath(this.crypto_network.getCodeCrypto(),'0')
            ).neutered().toBase58();

        return {
            'seed': seed,
            'xpriv': xprvString,
            'xpub': xpubString,
            'child': 0,
            'address': this.getPaymentAddress(master, crypto, '0'),
        };
    }

    public getPaymentAddress(xpriv: any, crypto: string, child: string, is_change = false) {
        const x = xpriv.derivePath( this.getPath(
            this.crypto_network.getCodeCrypto(), '0', is_change)
        );
        const network = this.crypto_network.getNetworkParams(crypto);

        return payments.p2pkh({pubkey: x.publicKey, network}).address;
    }
}
