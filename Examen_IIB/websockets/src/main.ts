import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  var express = require('express')
  var cors = require('cors')
  app.use(cors())
  await app.listen(11203);
}
bootstrap();
