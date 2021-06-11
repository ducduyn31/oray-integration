import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AuthModule} from './auth/auth.module';
import {NetworkModule} from './network/network.module';
import {EtcdModule} from 'nestjs-etcd3';

@Module({
    imports: [AuthModule, NetworkModule, EtcdModule.root({
        hosts: 'http://127.0.0.1:2379',
    })],
    controllers: [AppController],
    providers: [],
})
export class AppModule {
}
