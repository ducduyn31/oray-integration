import {Controller} from '@nestjs/common';
import {GrpcMethod} from '@nestjs/microservices';
import {NetworkService} from './network.service';

@Controller('network')
export class NetworkController {

    constructor(private readonly oray: NetworkService) {
    }

    @GrpcMethod('OrayNetworkService')
    createNetwork() {
        this.oray.createNetwork();
    }

    @GrpcMethod('OrayNetworkService')
    listNetworks() {
        this.oray.createNetwork();
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
