import {HttpService, Injectable} from '@nestjs/common';
import * as generate from 'project-name-generator';
import {filter, map} from 'rxjs/operators';
import {Config} from '../config';
import {UserService} from '../user/user.service';
import {Observable} from 'rxjs';
import {NetworkResponse} from './interfaces/network-response.interface';

const {PGY_API_SERVER, USER_API_SERVER} = Config;

@Injectable()
export class NetworkService {

    constructor(private readonly http: HttpService, private readonly userService: UserService) {
    }

    public createNetwork(token: string) {
        return this.http.post(`product/network/create`, {
            name: generate().spaced,
            type: 0,
            networkid: null,
        }, {
            baseURL: PGY_API_SERVER,
            headers: {
                authorization: token
            }
        }).pipe(
            map((response) => response.data),
        );
    }

    public listNetworks(token: string, user: string): Observable<NetworkResponse[]> {
        return this.http.get(`/product/network/list?r=${Math.random()}`, {
            baseURL: PGY_API_SERVER,
            headers: {
                authorization: token
            }
        }).pipe(
            map((response) => response.data),
            filter()
        );
    }

    public getNetworkInfo() {
        return this.http.get(`product/network/info/${network}?r=${Math.random()}`, {
            headers: {
                authorization: user,
            },
            baseURL: USER_API_SERVER,
        }).pipe(
            map((response) => response.data)
        );
    }

    public getNetworkState() {}

    public listNetworkMembers() {}

    public listUserAllNetworkMembers() {}

    public listMemberDevices() {}

    public removeMemberFromNetwork() {}

    public addMemberToNetwork() {}
}
