import { Controller, Body, Post, HttpStatus, Res, Header, Req } from '@nestjs/common';
import { AuthLogIn } from './auth.interface';
import { AuthService } from './auth.service';

@Controller('api/v1/auth')
export class AuthController {

    constructor(private service: AuthService) {}

    @Post()
    async logIn(@Body() login: AuthLogIn, @Res() res, @Req() req) {
        this.service.logIn(login)
        .then( data => {
            if (data.status === 'ok') {
                return res.status(HttpStatus.OK).json(data);
            } else {
                return res.status(HttpStatus.FORBIDDEN).json(data);
            }
        });
    }
}
