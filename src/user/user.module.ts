import {Module} from '@nestjs/common';
import {UserService} from './user.service';
import {ClientsModule, Transport} from '@nestjs/microservices';
import {Config} from '../config';

const {KAFKA_CLIENT_ID, KAFKA_BROKER} = Config;

@Module({
  imports: [ClientsModule.register([
    {
      name: 'KAFKA_SERVICE',
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: KAFKA_CLIENT_ID,
          brokers: [KAFKA_BROKER]
        },
        consumer: {
          groupId: 'user-factory',
          allowAutoTopicCreation: true,
        }
      }
    }
  ])],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
