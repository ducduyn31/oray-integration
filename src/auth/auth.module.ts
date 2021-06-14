import {CacheModule, HttpModule, Module} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {Config} from '../config';
import * as redisStore from 'cache-manager-redis-store';

const {REDIS_DEFAULT_TTL, REDIS_HOST, REDIS_PORT} = Config;

@Module({
  imports: [HttpModule, CacheModule.register({
    store: redisStore,
    host: REDIS_HOST,
    port: REDIS_PORT,
    ttl: REDIS_DEFAULT_TTL,
  })],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
