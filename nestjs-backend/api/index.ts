import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from '../src/app.module';
import express from 'express';

let server: express.Express;


async function bootstrap() {

  const expressApp = express();


  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );


  app.enableCors({
    origin: true,
    credentials: true,
  });


  await app.init();


  return expressApp;
}


export default async function handler(req, res) {

  server = server ?? await bootstrap();

  return server(req, res);
}
