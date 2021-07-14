import {Controller} from '@nestjs/common';
import {GrpcMethod} from '@nestjs/microservices';
import {NetworkService} from './network.service';
import {AuthService} from '../auth/auth.service';
import {Config} from '../config';
import {mergeMap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {AuthToken} from '../auth/interfaces/auth-token.interface';

const {
    ORAY_USERNAME, ORAY_PASSWORD
} = Config;

@Controller('network')
export class NetworkController {

    constructor(private readonly oray: NetworkService, private readonly auth: AuthService) {
    }

    @GrpcMethod('OrayNetworkService')
    createNetwork() {
        return this.getToken().pipe(
            mergeMap((payload) => this.oray.createNetwork(payload.token))
        );
    }

    bindNetwork(networkId: number, user: string) {}

    @GrpcMethod('OrayNetworkService')
    listNetworks(user: string) {
        return this.getToken().pipe(
            mergeMap((payload) => this.oray.listNetworks(payload.token, user))
        );
    }

    @GrpcMethod('OrayNetworkService')
    getNetworkInfo(user: string, network: number) {
        return this.getToken().pipe(
            mergeMap((payload) => this.oray.getNetworkInfo(payload.token, user, network)),
        );
    }

    @GrpcMethod('OrayNetworkService')
    networkState(user: string, network: number) {
        return this.getToken().pipe(
            mergeMap((payload) => this.oray.getNetworkState(payload.token, user, network)),
        );
    }

    @GrpcMethod('OrayNetworkService')
    listMembersInNetwork(user: string, network: number) {
        return this.getToken().pipe(
            mergeMap((payload) => this.oray.listNetworkMembers(payload.token, user, network)),
        );
    }

    @GrpcMethod('OrayNetworkService')
    listAllMembers(user: string) {
        return this.getToken().pipe(
            mergeMap((payload) => this.oray.listUserAllNetworkMembers(payload.token, user)),
        );
    }

    @GrpcMethod('OrayNetworkService')
    listAllDisconnectedMembers(user: string) {
        return this.getToken().pipe(
            mergeMap((payload) => this.oray.listUserAllNetworkMembers(payload.token, user)),
        );
    }

    @GrpcMethod('OrayNetworkService')
    listDevices(user: string) {
        return this.getToken().pipe(
            mergeMap((payload) => this.oray.listUserAllNetworkMembersNotConnected(payload.token, user)),
        );
    }

    @GrpcMethod('OrayNetworkService')
    removeMember() {
        // @ts-ignore
        this.oray.createNetwork();
    }

    @GrpcMethod('OrayNetworkService')
    addMember() {
        // @ts-ignore
        this.oray.createNetwork();
    }

    private getToken(): Observable<AuthToken> {
        return this.auth.getToken({
            username: ORAY_USERNAME,
            password: ORAY_PASSWORD,
        });
    }
}
