import {CacheModule, HttpModule, Module} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {REDIS_DEFAULT_TTL, REDIS_HOST, REDIS_PORT} from '../config';
import * as redisStore from 'cache-manager-redis-store';

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
