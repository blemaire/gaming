import {NestFactory} from '@nestjs/core';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import 'reflect-metadata';
import {AppModule} from './app.module';
import {Bot} from './bot/bot';
import * as commands from './bot/commands';
import {container} from './bot/utils/inversify.config';

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
  .setTitle('Thal bot api')
  .setDescription('The Thal bot API description')
  .setVersion('1.0')
  .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/', app, document);

  await app.listen(PORT);
}

bootstrap().then(() => {
  let bot = container.get<Bot>(Bot);
  bot.setCommands(commands);
  bot.start();
});
