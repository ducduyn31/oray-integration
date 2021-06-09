import { Controller } from '@nestjs/common';
import {AuthPayload} from './interfaces/auth-payload.interface';
import {Observable} from 'rxjs';
import {GrpcMethod} from '@nestjs/microservices';
import {AuthToken} from './interfaces/auth-token.interface';
import {AuthService} from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {
    }

    @GrpcMethod('OrayAuthService', 'Login')
    login(payload: AuthPayload): Observable<AuthToken> {
        return this.authService.getNewToken(payload);
    }
}
