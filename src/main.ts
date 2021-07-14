import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {MicroserviceOptions, Transport} from '@nestjs/microservices';
import {join} from 'path';
import {EtcdService} from 'nestjs-etcd3';
import {Config} from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const etcdService = app.get(EtcdService);
  etcdService.getClient().getAll().strings().then((config) => {
    Object.keys(Config).forEach(key => Config[key] = config[key]);
  });
  Object.keys(Config).forEach(key => etcdService.watch(key).subscribe(value => Config[key] = value));

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'oray',
      url: 'localhost:3031',
      protoPath: join(__dirname, './proto/oray.proto'),
    }
  });

  await app.startAllMicroservicesAsync();


}
bootstrap();
