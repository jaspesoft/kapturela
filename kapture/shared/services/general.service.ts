import { Injectable } from '@nestjs/common';

@Injectable()
export class GeneralService {
    public getRandom(length: number): string {
        let result: string;
        const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

        for (let i = length; i > 0; --i) {
          result = result + chars[Math.floor(Math.random() * chars.length)];
        }
        return result.replace('undefined', '');
    }
}
