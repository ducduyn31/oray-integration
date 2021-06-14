import {Inject, Injectable, OnModuleInit} from '@nestjs/common';
import {ClientKafka} from '@nestjs/microservices';
import {Config} from '../config';

const {KAFKA_GET_USER} = Config;

@Injectable()
export class UserService implements OnModuleInit {
    onModuleInit(): any {
        this.kafka.subscribeToResponseOf(KAFKA_GET_USER);
    }

    constructor(@Inject('KAFKA_SERVICE') private readonly kafka: ClientKafka) {
    }

    getUser(userId: string) {

    }

}
