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

        switch (symbol) {
            case 'ONX':
                if (this.testnet) {
                    this.code = 1;
                    networks.testnet.messagePrefix = '\x19kapturela Signed Message:\n';
                    networks.testnet.bip32.private = 0x049d7878;
                    networks.testnet.bip32.public = 0x049d7cb2;
                    networks.testnet.pubKeyHash = 0x4B;
                    networks.testnet.scriptHash = 0x05;
                    networks.testnet.wif = 0x80;

                } else {
                    this.code = 174;
                    networks.bitcoin.messagePrefix = '\x19kapturela Signed Message:\n';
                    networks.bitcoin.bip32.private = 0x04358394;
                    networks.bitcoin.bip32.public = 0x043587cf;
                    networks.bitcoin.pubKeyHash = 0x6f;
                    networks.bitcoin.scriptHash = 0xc4;
                    networks.bitcoin.wif = 0xef;
                }
                break;

        }
        if (this.testnet) {
            return networks.testnet;
        } else {
           return networks.bitcoin;
        }
    }
}
