import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // 开启 CORS
  // app.enableCors({
  //   origin: [
  //     'http://localhost:3000',       // 本地开发前端
  //     'https://ai-travel-planner-agent.vercel.app', // Vercel 前端
  //   ],
  //   credentials: true,
  //   methods: [
  //     'GET',
  //     'POST',
  //     'PUT',
  //     'PATCH',
  //     'DELETE',
  //     'OPTIONS',
  //   ],
  //   allowedHeaders: [
  //     'Content-Type',
  //     'Authorization',
  //   ],
  // });

  app.enableCors({
    origin: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const configService = app.get(ConfigService);
  const port = configService.get<number>("PORT") || 3000;

  await app.listen(port);
  console.log(`NestJS server listening on http://localhost:${port}`);
}

bootstrap();
