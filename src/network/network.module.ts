import {CacheModule, HttpModule, Module} from '@nestjs/common';
import {NetworkController} from './network.controller';
import {NetworkService} from './network.service';
import {AuthModule} from '../auth/auth.module';
import {AuthService} from '../auth/auth.service';
import {Config} from '../config';
import * as redisStore from 'cache-manager-redis-store';
import {UserModule} from '../user/user.module';
import {ClientsModule, Transport} from '@nestjs/microservices';

const {REDIS_DEFAULT_TTL, REDIS_HOST, REDIS_PORT, KAFKA_CLIENT_ID, KAFKA_BROKER} = Config;

@Module({
  imports: [HttpModule, AuthModule, UserModule, CacheModule.register({
    store: redisStore,
    host: REDIS_HOST,
    port: REDIS_PORT,
    ttl: REDIS_DEFAULT_TTL,
  }), ClientsModule.register([
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
  controllers: [NetworkController],
  providers: [NetworkService, AuthService]
})
export class NetworkModule {}
