import {CACHE_MANAGER, HttpService, Inject, Injectable} from '@nestjs/common';
import {Cache} from 'cache-manager';
import {AuthPayload} from './interfaces/auth-payload.interface';
import {asapScheduler, Observable, of, scheduled} from 'rxjs';
import {AuthToken} from './interfaces/auth-token.interface';
import {USER_API_SERVER} from '../config';
import {map, switchMap, tap} from 'rxjs/operators';
import {TokenPayload} from './interfaces/token-payload.interface';
import * as moment from 'moment';

@Injectable()
export class AuthService {
    constructor(private readonly http: HttpService, @Inject(CACHE_MANAGER) private cache: Cache) {
    }

    public getNewToken(payload: AuthPayload): Observable<AuthToken> {
        return this.http.post(`authorization`, {
            account: payload.username,
            password: payload.password,
            ismd5: true,
        }, {
            baseURL: USER_API_SERVER,
        }).pipe(
            map((response) => response.data),
            tap((response) => this.cache.set(payload.username, JSON.stringify(response))),
        );
    }

    public getToken(payload: AuthPayload): Observable<AuthToken> {
        const $lastToken = scheduled(this.cache.get(payload.username), asapScheduler);
        return $lastToken.pipe(
            switchMap((lastTokenStr: string) => {
                if (!lastTokenStr) {
                    return this.getNewToken(payload);
                }
                const lastToken: AuthToken = JSON.parse(lastTokenStr);
                const b64TokenPayload = lastToken.token.split('.')[1];
                const tokenPayload: TokenPayload = JSON.parse(Buffer.alloc(119, b64TokenPayload, 'base64').toString());

                if (moment(tokenPayload.exp * 1000).isBefore(moment())) {
                    return this.getNewToken(payload);
                }

                return of(lastToken);
            })
        );
    }
}
