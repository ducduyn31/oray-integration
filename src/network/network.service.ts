import {HttpService, Injectable} from '@nestjs/common';
import * as generate from 'project-name-generator';
import {filter, map, mergeMap} from 'rxjs/operators';
import {Config} from '../config';
import {UserService} from '../user/user.service';
import {Observable, of} from 'rxjs';
import {NetworkResponse} from './interfaces/network-response.interface';
import {NetworkStatusResponse} from './interfaces/network-status-response.interface';
import {NetworkMemberResponse} from './interfaces/network-member-response.interface';
import {HardwareMemberGeneralInfoResponse, SoftwareMemberGeneralInfoResponse} from './interfaces/member-general-info-response.interface';
import {DeviceResponse} from './interfaces/device-response.interface';

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
        return this.userService.getUser(user).pipe(
            mergeMap((theUser) => this.http.get(`/product/network/list?r=${Math.random()}`, {
                    baseURL: PGY_API_SERVER,
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }).pipe(
                map((response) => response.data),
                filter(network => theUser.networks.includes(network.networkid))
                ),
            ),
        );
    }

    public getNetworkInfo(token: string, user: string, network: number): Observable<NetworkResponse> {
        return this.userService.getUser(user).pipe(
            mergeMap((theUser) => this.http.get(`product/network/info/${network}?r=${Math.random()}`, {
                    headers: {
                        authorization: token,
                    },
                    baseURL: USER_API_SERVER,
                }).pipe(
                map((response) => response.data),
                filter(network => theUser.networks.includes(network.networkid)),
                ),
            ),
        );
    }

    public getNetworkState(token: string, user: string, network: number): Observable<NetworkStatusResponse> {
        return this.userService.getUser(user).pipe(
            mergeMap((theUser) => this.http.get(`/product/network/online-state/${network}?r=${Math.random()}`, {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                    baseURL: PGY_API_SERVER,
                }).pipe(
                map((response) => response.data),
                filter(network => theUser.networks.includes(network.networkid))
                ),
            ),
        );
    }

    public listNetworkMembers(token: string, user: string, network: number): Observable<NetworkMemberResponse[]> {
        return this.userService.getUser(user).pipe(
            mergeMap((theUser) => this.http.get(`product/network/members/${network}?r=${Math.random()}`, {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                    baseURL: PGY_API_SERVER,
                }).pipe(
                map((response) => response.data),
                filter(network => theUser.networks.includes(network.networkid)),
                ),
            )
        );
    }

    public listUserAllNetworkMembers(token: string, user: string): Observable<Array<HardwareMemberGeneralInfoResponse | SoftwareMemberGeneralInfoResponse>> {
        return this.userService.getUser(user).pipe(
            mergeMap((theUser) => this.http.get(`product/member/list`, {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                    baseURL: PGY_API_SERVER,
                }).pipe(
                map((response) => response.data),
                filter(network => theUser.networks.includes(network.networkid)),
                ),
            ),
        );
    }

    public listUserAllNetworkMembersNotConnected(token: string, user: string): Observable<Array<HardwareMemberGeneralInfoResponse | SoftwareMemberGeneralInfoResponse>> {
        return this.userService.getUser(user).pipe(
            mergeMap((theUser) => this.http.get(`product/member/list?isnetworked=0`, {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                    baseURL: PGY_API_SERVER,
                }).pipe(
                map((response) => response.data),
                filter(network => theUser.networks.includes(network.networkid)),
                ),
            )
        );
    }

    public listMemberDevices(token: string, user: string, member: string): Observable<DeviceResponse[]> {
        return this.userService.getUser(user).pipe(
            mergeMap((theUser) => this.http.get(`oraybox/device/get`, {
                    headers: {
                        authorization: `Bearer ${token}`,
                        'X-Oraybox': member,
                    },
                    baseURL: PGY_API_SERVER,
                }).pipe(
                map((response) => response.data),

                ),
            ),
        );
    }

    public removeMemberFromNetwork() {
    }

    public addMemberToNetwork() {
    }

    private isMemberOfUser(token: string, user: string, member: string): Observable<boolean> {
        return this.listUserAllNetworkMembers(token, user).pipe(
            mergeMap((members) => of(members.map(m => m.memberid).includes(member)))
        );
    }
}
