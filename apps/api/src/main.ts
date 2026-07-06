import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { parseEnv } from "@hog/config";

async function bootstrap() {
  // Validate environment before doing anything else.
  // If DATABASE_URL or JWT_SECRET is missing, this kills the process
  // with a clear error — not a cryptic crash 5 minutes later.

  const env = parseEnv(process.env);

  const app = await NestFactory.create(AppModule);

  // Global prefix: all routes start with /api/v1/
  app.setGlobalPrefix(env.API_PREFIX);

  // CORS: allow requests from our frontend dev servers
  app.enableCors({
    origin: env.CORS_ORIGINS.split(","),
    credentials: true,
  });

  // Swagger API docs — available at /api/v1/docs
  const swaggerConfig = new DocumentBuilder()
    .setTitle("House of Glamour API")
    .setDescription("Integrated eCommerce, POS & ERP Platform")
    .setVersion("1.0")
    .addBearerAuth()
    .addTag("auth", "Authentication & user management")
    .addTag("products", "Product catalogue")
    .addTag("orders", "Order management")
    .addTag("inventory", "Stock management")
    .addTag("accounting", "Chart of accounts, journal entries, GL")
    .addTag("campaigns", "Sales promotions & promo codes")
    .addTag("notifications", "Alerts & WhatsApp")
    .addTag("feedback", "Reviews & customer feedback")
    .addTag("audit", "Transaction audit log")
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(`${env.API_PREFIX}/docs`, app, document);

  await app.listen(env.API_PORT);

  console.log(`House of Glamour API`);
  console.log(`  Server:  http://localhost:${env.API_PORT}${env.API_PREFIX}`);
  console.log(
    `  Swagger: http://localhost:${env.API_PORT}${env.API_PREFIX}/docs`,
  );
  console.log(`  Mode:    ${env.NODE_ENV}`);
}

bootstrap();
