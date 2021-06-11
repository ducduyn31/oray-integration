import {CacheModule, HttpModule, Module} from '@nestjs/common';
import {NetworkController} from './network.controller';
import {NetworkService} from './network.service';
import {AuthModule} from '../auth/auth.module';
import {AuthService} from '../auth/auth.service';
import {REDIS_DEFAULT_TTL, REDIS_HOST, REDIS_PORT} from '../config';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [HttpModule, AuthModule, CacheModule.register({
    store: redisStore,
    host: REDIS_HOST,
    port: REDIS_PORT,
    ttl: REDIS_DEFAULT_TTL,
  })],
  controllers: [NetworkController],
  providers: [NetworkService, AuthService]
})
export class NetworkModule {}
