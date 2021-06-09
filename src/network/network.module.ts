import {HttpModule, Module} from '@nestjs/common';
import {NetworkController} from './network.controller';
import {NetworkService} from './network.service';
import {AuthModule} from '../auth/auth.module';
import {AuthService} from '../auth/auth.service';

@Module({
  imports: [HttpModule, AuthModule],
  controllers: [NetworkController],
  providers: [NetworkService, AuthService]
})
export class NetworkModule {}
