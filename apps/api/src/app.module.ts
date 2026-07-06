import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./common/prisma.module";

@Module({
  imports: [
    // Load .env file and make it available via ConfigService
    ConfigModule.forRoot({ isGlobal: true }),

    // Database connection — available to all modules
    PrismaModule,

    // Feature modules will be added here as we build them:
    // AuthModule,
    // ProductsModule,
    // CategoriesModule,
    // BrandsModule,
    // RolesModule,
    // InventoryModule,
    // OrdersModule,
    // PaymentsModule,
    // CustomersModule,
    // AccountingModule,
    // CampaignsModule,
    // NotificationsModule,
    // FeedbackModule,
    // AuditModule,
    // ReportsModule,
  ],
})
export class AppModule {}
