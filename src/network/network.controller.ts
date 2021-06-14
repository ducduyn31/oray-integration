import {Controller} from '@nestjs/common';
import {GrpcMethod} from '@nestjs/microservices';
import {NetworkService} from './network.service';
import {AuthService} from '../auth/auth.service';
import {Config} from '../config';
import {mergeMap} from 'rxjs/operators';

const {
    ORAY_USERNAME, ORAY_PASSWORD
} = Config;

@Controller('network')
export class NetworkController {

    constructor(private readonly oray: NetworkService, private readonly auth: AuthService) {
    }

    @GrpcMethod('OrayNetworkService')
    createNetwork() {
        return this.auth.getToken({
            username: ORAY_USERNAME,
            password: ORAY_PASSWORD,
        }).pipe(
            mergeMap((payload) => this.oray.createNetwork(payload.token))
        );
    }

    @GrpcMethod('OrayNetworkService')
    listNetworks(user: string) {
        return this.auth.getToken({
            username: ORAY_USERNAME,
            password: ORAY_PASSWORD,
        }).pipe(
            mergeMap((payload) => this.oray.listNetworks(payload.token, user))
        );
    }

    @GrpcMethod('OrayNetworkService')
    getNetworkInfo() {
        this.oray.createNetwork();
    }

    @GrpcMethod('OrayNetworkService')
    networkState() {
        this.oray.createNetwork();
    }

    @GrpcMethod('OrayNetworkService')
    listMembersInNetwork() {
        this.oray.createNetwork();
    }

    @GrpcMethod('OrayNetworkService')
    listAllMembers() {
        this.oray.createNetwork();
    }

    @GrpcMethod('OrayNetworkService')
    listDevices() {
        this.oray.createNetwork();
    }

    @GrpcMethod('OrayNetworkService')
    removeMember() {
        this.oray.createNetwork();
    }

    @GrpcMethod('OrayNetworkService')
    addMember() {
        this.oray.createNetwork();
    }


}
