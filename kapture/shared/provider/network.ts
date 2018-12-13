import { Injectable } from '@nestjs/common';
import { environment } from 'kapture/environment/environment';
import { networks } from 'bitcoinjs-lib';


@Injectable()
export class Network {

    private code: number;
    private testnet: boolean;

    constructor() {
        this.testnet = environment.testnet;
    }
    public getCodeCrypto() {
        return this.code;
    }
    public getNetworkParams(symbol: string): any {
        let network: any;

        switch (symbol) {
            case 'ONX':
                if (this.testnet) {
                    this.code = 1;
                    network = {
                        'messagePrefix': '\x19unused:\n',
                        'bip32': {
                            'public': 0x049d7cb2,
                            'private': 0x049d7878
                        },
                        'pubKeyHash': 0x4B,
                        'scriptHash': 0x05,
                        'wif': 0x80
                    };
                } else {
                    this.code = 174;
                    network = {
                        'messagePrefix': '\x19unused:\n',
                        'bip32': {
                            'public': 0x043587cf,
                            'private': 0x04358394
                        },
                        'pubKeyHash': 0x6f,
                        'scriptHash': 0xc4,
                        'wif': 0xef
                    };
                }
                break;
            case 'BTC':
                if (this.testnet) {
                    this.code = 1;
                    network = networks.testnet;
                } else {
                    this.code = 0;
                    network = networks.testnet;
                }
                break;
        }

        return network;
    }
}
