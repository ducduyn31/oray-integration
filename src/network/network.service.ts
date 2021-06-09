import {HttpService, Injectable} from '@nestjs/common';
import * as generate from 'project-name-generator';
import {map} from 'rxjs/operators';
import {PGY_API_SERVER} from '../config';

@Injectable()
export class NetworkService {

    constructor(private readonly http: HttpService) {
    }

    public createNetwork() {
        return this.http.post(`product/network/create`, {
            name: generate().spaced,
            type: 0,
            networkid: null,
        }, {
            baseURL: PGY_API_SERVER,
        }).pipe(
            map((response) => response.data),
        );
    }

    public listNetworks(user: string) {
        return this.http.get(`/product/network/list?r=${Math.random()}`, {
            baseURL: PGY_API_SERVER,
        }).pipe(
            map((response) => response.data)
        );
    }

    public getNetworkInfo() {}

    public getNetworkState() {}

    public listNetworkMembers() {}

    public listUserAllNetworkMembers() {}

    public listMemberDevices() {}

    public removeMemberFromNetwork() {}

    public addMemberToNetwork() {}
}
