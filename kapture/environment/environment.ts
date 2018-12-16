const testnet = true;

function getSystemParameters() {
    if (testnet) {
        return {
            seed: 'hooola',
            nro: 2,
            testnet: true,
        };
    } else {
        return {
            seed: '',
            nro: 2,
            testnet: false,
        };
    }

}

export const environment = getSystemParameters();
