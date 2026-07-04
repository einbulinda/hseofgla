import { z } from "zod";

// ──────────────────────────────────────────────
// House of Glamour — Configuration & Constants
//
// Environment validation + business constants
// shared across all apps.
// ──────────────────────────────────────────────

// ═══════════════════════════════════════════════
// ENVIRONMENT SCHEMA
// Validates process.env at startup. Missing or
// malformed values crash the server immediately
// with a clear error — not 20 minutes later when
// a user hits the broken endpoint.
// ═══════════════════════════════════════════════

export const EnvSchema = z.object({
  NODE_ENV: z
    .enum(["development", "staging", "production"])
    .default("development"),

  // Database
  DATABASE_URL: z
    .string()
    .url("DATABASE_URL must be a valid connection string"),
  REDIS_URL: z.string().default("redis://localhost:6379"),

  // Auth
  JWT_SECRET: z.string().min(32, "JWT_SECRET must be at least 32 characters"),
  JWT_ACCESS_EXPIRY: z.string().default("15m"),
  JWT_REFRESH_EXPIRY: z.string().default("7d"),

  // API
  API_PORT: z.coerce.number().default(4000),
  API_PREFIX: z.string().default("/api/v1"),
  CORS_ORIGINS: z.string().default("http://localhost:3000"),

  // Storage
  STORAGE_DRIVER: z.enum(["local", "s3"]).default("local"),
  STORAGE_LOCAL_PATH: z.string().default("./uploads"),

  // M-Pesa
  MPESA_ENV: z.enum(["sandbox", "production"]).default("sandbox"),

  // WhatsApp
  WHATSAPP_CHAT_ENABLED: z.coerce.boolean().default(false),

  // Frontend URLs
  WEB_URL: z.string().default("http://localhost:3000"),
  ERP_URL: z.string().default("http://localhost:3001"),
  POS_URL: z.string().default("http://localhost:3002"),
});

export type Env = z.infer<typeof EnvSchema>;

/**
 * Parse and validate environment variables.
 * Call this once at server startup.
 *
 * Usage in NestJS main.ts:
 *   const env = parseEnv(process.env);
 *   // env.DATABASE_URL is now typed and guaranteed to exist
 */
export function parseEnv(raw: Record<string, string | undefined>): Env {
  const result = EnvSchema.safeParse(raw);
  if (!result.success) {
    console.error("❌ Invalid environment variables:");
    console.error(result.error.format());
    process.exit(1);
  }
  return result.data;
}

// ═══════════════════════════════════════════════
// BUSINESS CONSTANTS
// ═══════════════════════════════════════════════

/** Kenya VAT standard rate */
export const KENYA_VAT_RATE = 0.16;

/** Default currency */
export const CURRENCY = "KES";

/** Pagination defaults */
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

// ═══════════════════════════════════════════════
// CHART OF ACCOUNTS — Code Ranges
// These define which account numbers belong to
// which account type. Used in validation and
// auto-suggestion when creating new accounts.
// ═══════════════════════════════════════════════

export const ACCOUNT_CODE_RANGES = {
  ASSETS: { min: 1000, max: 1999 },
  LIABILITIES: { min: 2000, max: 2999 },
  EQUITY: { min: 3000, max: 3999 },
  REVENUE: { min: 4000, max: 4999 },
  COGS: { min: 5000, max: 5999 },
  EXPENSES: { min: 6000, max: 6999 },
  OTHER: { min: 7000, max: 7999 },
} as const;

// ═══════════════════════════════════════════════
// DEFAULT SYSTEM ACCOUNTS
// Account numbers that the automated journal
// entry rules reference. These are seeded in the
// database during Phase 1 and marked is_system=true.
// ═══════════════════════════════════════════════

export const SYSTEM_ACCOUNTS = {
  CASH_AT_BANK: "1000",
  MPESA_FLOAT: "1010",
  PETTY_CASH: "1020",
  ACCOUNTS_RECEIVABLE: "1100",
  INVENTORY: "1200",
  PREPAID_EXPENSES: "1300",
  PROPERTY_EQUIPMENT: "1500",
  ACCUM_DEPRECIATION: "1510",
  ACCOUNTS_PAYABLE: "2000",
  VAT_OUTPUT: "2100",
  VAT_INPUT: "2110",
  ACCRUED_EXPENSES: "2200",
  SALARIES_PAYABLE: "2300",
  CUSTOMER_DEPOSITS: "2400",
  OWNERS_CAPITAL: "3000",
  RETAINED_EARNINGS: "3100",
  CURRENT_EARNINGS: "3200",
  DRAWINGS: "3300",
  SALES_ONLINE: "4000",
  SALES_POS: "4010",
  SALES_RETURNS: "4100",
  SALES_DISCOUNTS: "4200",
  OTHER_INCOME: "4500",
  COGS: "5000",
  PURCHASE_DISCOUNTS: "5100",
  FREIGHT_IN: "5200",
  INVENTORY_WRITEOFFS: "5300",
  SALARIES_WAGES: "6000",
  RENT: "6100",
  UTILITIES: "6200",
  MARKETING: "6300",
  DELIVERY_COSTS: "6400",
  DEPRECIATION: "6500",
  PAYMENT_FEES: "6600",
  OFFICE_SUPPLIES: "6700",
  INSURANCE: "6800",
  MISC_EXPENSES: "6900",
  INTEREST_INCOME: "7000",
  INTEREST_EXPENSE: "7100",
  FX_GAIN_LOSS: "7200",
  TAX_EXPENSE: "7500",
} as const;

// ═══════════════════════════════════════════════
// DEFAULT ROLES
// Seeded during Phase 1. Used by the seed script
// and referenced throughout the codebase.
// ═══════════════════════════════════════════════

export const SYSTEM_ROLES = [
  {
    code: "ADMIN",
    name: "Administrator",
    description: "Full system access across all modules",
  },
  {
    code: "FINANCE_MANAGER",
    name: "Finance Manager",
    description:
      "Accounting, financial reports, journal approval, bank reconciliation",
  },
  {
    code: "STORE_MANAGER",
    name: "Store Manager",
    description:
      "Products, inventory, orders, campaigns, notifications, feedback",
  },
  {
    code: "ACCOUNTANT",
    name: "Accountant",
    description:
      "Journal entries, general ledger, reconciliation (no approval)",
  },
  {
    code: "CASHIER",
    name: "Cashier",
    description: "POS operations, basic order and product view",
  },
  {
    code: "INVENTORY_CLERK",
    name: "Inventory Clerk",
    description: "Stock adjustments, transfers, movement history",
  },
  {
    code: "VIEWER",
    name: "Viewer",
    description: "Read-only access to permitted modules",
  },
] as const;

/**
 * Notification event types that can trigger alerts.
 * Maps to the notification_rules table's event_type column.
 */
export const NOTIFICATION_EVENTS = [
  "ORDER_PLACED",
  "ORDER_CONFIRMED",
  "ORDER_SHIPPED",
  "ORDER_DELIVERED",
  "PAYMENT_RECEIVED",
  "REFUND_PROCESSED",
  "CAMPAIGN_LAUNCH",
  "LOW_STOCK",
  "FEEDBACK_REQUEST",
] as const;

export type NotificationEvent = (typeof NOTIFICATION_EVENTS)[number];
