import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {MicroserviceOptions, Transport} from '@nestjs/microservices';
import {join} from 'path';
import {EtcdService} from 'nestjs-etcd3';
import {Config} from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const etcdService = app.get(EtcdService);
  Object.keys(Config).forEach(key => etcdService.watch(key).subscribe(value => console.log(value)))

  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.GRPC,
  //   options: {
  //     package: 'oray',
  //     url: '0.0.0.0:5000',
  //     protoPath: join(__dirname, './proto/oray.proto'),
  //   }
  // })
  // await app.startAllMicroservicesAsync();
  await app.listen(3000);


}
bootstrap();
