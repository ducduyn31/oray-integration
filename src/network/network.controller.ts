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
}
