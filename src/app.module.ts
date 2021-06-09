import {CacheModule, Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AuthModule} from './auth/auth.module';
import {NetworkModule} from './network/network.module';
import {EtcdModule} from 'nestjs-etcd3';
import {REDIS_DEFAULT_TTL, REDIS_HOST, REDIS_PORT} from './config';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [AuthModule, NetworkModule, EtcdModule.root({
    hosts: 'http://etcd:2379',
  }),  CacheModule.register({
    store: redisStore,
    host: REDIS_HOST,
    port: REDIS_PORT,
    ttl: REDIS_DEFAULT_TTL,
  })],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
