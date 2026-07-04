import { z } from "zod";

// ──────────────────────────────────────────────
// House of Glamour — Validation Schemas
//
// Each schema validates incoming API request data.
// Used in both backend (controller validation) and
// frontend (form validation) — one definition, two uses.
// ──────────────────────────────────────────────

// ── Reusable Patterns ─────────────────────────

/** Kenyan phone: 0722522119 or +254722522119 */
const kenyanPhone = z
  .string()
  .regex(
    /^(?:\+254|0)[17]\d{8}$/,
    "Invalid Kenyan phone number (expected 0722... or +254722...)",
  );

/** Positive Ksh amount with 2 decimal places max */
const kshAmount = z.number().positive("Amount must be positive");

// ═══════════════════════════════════════════════
// AUTH
// ═══════════════════════════════════════════════

export const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const RegisterSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(100),
  lastName: z.string().min(1, "Last name is required").max(100),
  email: z.string().email("Invalid email address"),
  phone: kenyanPhone,
  password: z.string().min(8).max(128),
});

export const CreateStaffUserSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.string().email(),
  roleId: z.string().uuid(),
  storeId: z.string().uuid(),
  tempPassword: z.string().min(8),
});

// ═══════════════════════════════════════════════
// PRODUCTS
// ═══════════════════════════════════════════════

export const CreateProductSchema = z.object({
  sku: z.string().min(1).max(50),
  name: z.string().min(1).max(255),
  description: z.string().optional(),
  brandId: z.string().uuid(),
  categoryId: z.string().uuid(),
  basePrice: kshAmount,
  salePrice: kshAmount.optional().nullable(),
  costPrice: z.number().nonnegative(),
  weight: z.number().nonnegative().optional().nullable(),
  dimensions: z.string().optional().nullable(),
  tags: z.array(z.string()).optional(),
  catalogueCode: z.string().optional().nullable(),
});

export const UpdateProductSchema = CreateProductSchema.partial();

export const UpdatePriceSchema = z.object({
  basePrice: kshAmount.optional(),
  salePrice: kshAmount.optional().nullable(),
  costPrice: z.number().nonnegative().optional(),
});

// ═══════════════════════════════════════════════
// INVENTORY
// ═══════════════════════════════════════════════

export const AdjustStockSchema = z.object({
  quantity: z.number().int("Quantity must be a whole number"),
  reason: z.string().min(1, "Adjustment reason is required"),
  notes: z.string().optional(),
});

export const TransferStockSchema = z.object({
  productId: z.string().uuid(),
  fromStoreId: z.string().uuid(),
  toStoreId: z.string().uuid(),
  quantity: z.number().int().positive(),
  notes: z.string().optional(),
});

// ═══════════════════════════════════════════════
// ORDERS
// ═══════════════════════════════════════════════

const OrderItemSchema = z.object({
  productId: z.string().uuid(),
  variantId: z.string().uuid().optional().nullable(),
  quantity: z.number().int().positive("Quantity must be at least 1"),
});

export const CreateOrderSchema = z.object({
  customerId: z.string().uuid().optional().nullable(),
  storeId: z.string().uuid(),
  channel: z.enum(["ONLINE", "POS"]),
  items: z.array(OrderItemSchema).min(1, "Order must have at least one item"),
  shippingAddress: z.string().optional().nullable(),
  promoCode: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
});

export const UpdateOrderStatusSchema = z.object({
  status: z.enum([
    "PENDING",
    "CONFIRMED",
    "PROCESSING",
    "SHIPPED",
    "DELIVERED",
    "CANCELLED",
  ]),
});

// ═══════════════════════════════════════════════
// PAYMENTS
// ═══════════════════════════════════════════════

export const InitiateMpesaSchema = z.object({
  orderId: z.string().uuid(),
  phone: kenyanPhone,
  amount: kshAmount,
});

export const RecordCashPaymentSchema = z.object({
  orderId: z.string().uuid(),
  amount: kshAmount,
  tenderedAmount: kshAmount,
});

// ═══════════════════════════════════════════════
// ACCOUNTING
// ═══════════════════════════════════════════════

export const CreateAccountSchema = z.object({
  accountNumber: z
    .string()
    .regex(/^\d{4}$/, "Account number must be exactly 4 digits"),
  name: z.string().min(1).max(255),
  accountTypeId: z.string().uuid(),
  accountGroupId: z.string().uuid().optional().nullable(),
  parentAccountId: z.string().uuid().optional().nullable(),
  description: z.string().optional().nullable(),
  currency: z.string().default("KES"),
});

const JournalLineSchema = z
  .object({
    accountId: z.string().uuid(),
    debitAmount: z.number().nonnegative(),
    creditAmount: z.number().nonnegative(),
    description: z.string().optional().nullable(),
    costCentreId: z.string().uuid().optional().nullable(),
    taxCodeId: z.string().uuid().optional().nullable(),
  })
  .refine(
    (line) => {
      const hasDebit = line.debitAmount > 0;
      const hasCredit = line.creditAmount > 0;
      return hasDebit !== hasCredit; // exactly one must be positive
    },
    {
      message:
        "Each line must have either a debit or credit amount, not both and not neither",
    },
  );

export const CreateJournalEntrySchema = z
  .object({
    entryDate: z.coerce.date(),
    description: z.string().min(1, "Description is required"),
    sourceType: z.enum([
      "SALE",
      "PURCHASE",
      "PAYMENT",
      "RECEIPT",
      "MANUAL",
      "ADJUSTMENT",
      "CLOSING",
    ]),
    sourceId: z.string().uuid().optional().nullable(),
    lines: z
      .array(JournalLineSchema)
      .min(2, "Journal entry must have at least 2 lines"),
  })
  .refine(
    (entry) => {
      const totalDebits = entry.lines.reduce(
        (sum, l) => sum + l.debitAmount,
        0,
      );
      const totalCredits = entry.lines.reduce(
        (sum, l) => sum + l.creditAmount,
        0,
      );
      return Math.abs(totalDebits - totalCredits) < 0.01;
    },
    { message: "Total debits must equal total credits" },
  );

// ═══════════════════════════════════════════════
// CAMPAIGNS
// ═══════════════════════════════════════════════

export const CreateCampaignSchema = z
  .object({
    name: z.string().min(1).max(255),
    description: z.string().optional().nullable(),
    campaignType: z.enum([
      "PERCENTAGE_DISCOUNT",
      "FIXED_DISCOUNT",
      "BUY_X_GET_Y",
      "BUNDLE",
      "FREE_SHIPPING",
      "FLASH_SALE",
    ]),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    channels: z.enum(["ONLINE", "POS", "ALL"]),
    priority: z.number().int().nonnegative().default(0),
    budgetLimit: kshAmount.optional().nullable(),
    termsText: z.string().optional().nullable(),
  })
  .refine((c) => c.endDate > c.startDate, {
    message: "End date must be after start date",
  });

export const ValidatePromoCodeSchema = z.object({
  code: z.string().min(1).max(50).toUpperCase(),
  orderTotal: kshAmount,
  customerId: z.string().uuid().optional().nullable(),
  channel: z.enum(["ONLINE", "POS"]),
});

// ═══════════════════════════════════════════════
// FEEDBACK
// ═══════════════════════════════════════════════

export const CreateReviewSchema = z.object({
  productId: z.string().uuid(),
  orderId: z.string().uuid().optional().nullable(),
  rating: z.number().int().min(1).max(5),
  title: z.string().min(1).max(255),
  body: z.string().min(10, "Review must be at least 10 characters").max(2000),
});

export const CreateFeedbackSchema = z.object({
  orderId: z.string().uuid().optional().nullable(),
  feedbackType: z.enum([
    "GENERAL",
    "DELIVERY",
    "PAYMENT",
    "PRODUCT_QUALITY",
    "CUSTOMER_SERVICE",
  ]),
  rating: z.number().int().min(1).max(5),
  comment: z.string().min(10).max(2000),
});

// ═══════════════════════════════════════════════
// PAGINATION — Reused across every list endpoint
// ═══════════════════════════════════════════════

export const PaginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  perPage: z.coerce.number().int().min(1).max(100).default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

// ═══════════════════════════════════════════════
// EXPORTED TYPES — Inferred from schemas so you
// never define the shape twice
// ═══════════════════════════════════════════════

export type LoginInput = z.infer<typeof LoginSchema>;
export type RegisterInput = z.infer<typeof RegisterSchema>;
export type CreateProductInput = z.infer<typeof CreateProductSchema>;
export type UpdateProductInput = z.infer<typeof UpdateProductSchema>;
export type CreateOrderInput = z.infer<typeof CreateOrderSchema>;
export type AdjustStockInput = z.infer<typeof AdjustStockSchema>;
export type InitiateMpesaInput = z.infer<typeof InitiateMpesaSchema>;
export type CreateJournalEntryInput = z.infer<typeof CreateJournalEntrySchema>;
export type CreateCampaignInput = z.infer<typeof CreateCampaignSchema>;
export type CreateReviewInput = z.infer<typeof CreateReviewSchema>;
export type CreateFeedbackInput = z.infer<typeof CreateFeedbackSchema>;
export type PaginationInput = z.infer<typeof PaginationSchema>;
