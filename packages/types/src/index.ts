// ──────────────────────────────────────────────
// House of Glamour — Shared Type Definitions
// Single source of truth for all apps
// ──────────────────────────────────────────────

// ═══════════════════════════════════════════════
// ENUMS — Used in database columns, API params,
// and frontend dropdowns alike
// ═══════════════════════════════════════════════

export enum UserRoleCode {
  ADMIN = "ADMIN",
  FINANCE_MANAGER = "FINANCE_MANAGER",
  STORE_MANAGER = "STORE_MANAGER",
  ACCOUNTANT = "ACCOUNTANT",
  CASHIER = "CASHIER",
  INVENTORY_CLERK = "INVENTORY_CLERK",
  VIEWER = "VIEWER",
}

export enum OrderChannel {
  ONLINE = "ONLINE",
  POS = "POS",
}

export enum OrderStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
  RETURNED = "RETURNED",
}

export enum PaymentMethod {
  MPESA = "MPESA",
  CARD = "CARD",
  CASH = "CASH",
  AIRTEL = "AIRTEL",
}

export enum PaymentStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
}

export enum StockMovementType {
  SALE = "SALE",
  RETURN = "RETURN",
  RESTOCK = "RESTOCK",
  ADJUSTMENT = "ADJUSTMENT",
  TRANSFER = "TRANSFER",
}

export enum AccessLevel {
  FULL = "FULL",
  READ_ONLY = "READ_ONLY",
  NONE = "NONE",
}

// ── Accounting Enums ──────────────────────────

export enum AccountType {
  ASSET = "ASSET",
  LIABILITY = "LIABILITY",
  EQUITY = "EQUITY",
  REVENUE = "REVENUE",
  EXPENSE = "EXPENSE",
}

export enum NormalBalance {
  DEBIT = "DEBIT",
  CREDIT = "CREDIT",
}

export enum JournalEntryStatus {
  DRAFT = "DRAFT",
  POSTED = "POSTED",
  REVERSED = "REVERSED",
}

export enum JournalSourceType {
  SALE = "SALE",
  PURCHASE = "PURCHASE",
  PAYMENT = "PAYMENT",
  RECEIPT = "RECEIPT",
  MANUAL = "MANUAL",
  ADJUSTMENT = "ADJUSTMENT",
  CLOSING = "CLOSING",
}

export enum FiscalPeriodStatus {
  OPEN = "OPEN",
  CLOSED = "CLOSED",
  ADJUSTMENT = "ADJUSTMENT",
}

// ── Campaign Enums ────────────────────────────

export enum CampaignType {
  PERCENTAGE_DISCOUNT = "PERCENTAGE_DISCOUNT",
  FIXED_DISCOUNT = "FIXED_DISCOUNT",
  BUY_X_GET_Y = "BUY_X_GET_Y",
  BUNDLE = "BUNDLE",
  FREE_SHIPPING = "FREE_SHIPPING",
  FLASH_SALE = "FLASH_SALE",
}

export enum CampaignStatus {
  DRAFT = "DRAFT",
  SCHEDULED = "SCHEDULED",
  ACTIVE = "ACTIVE",
  PAUSED = "PAUSED",
  ENDED = "ENDED",
  CANCELLED = "CANCELLED",
}

export enum CampaignChannel {
  ONLINE = "ONLINE",
  POS = "POS",
  ALL = "ALL",
}

// ── Notification Enums ────────────────────────

export enum NotificationChannel {
  WHATSAPP = "WHATSAPP",
  SMS = "SMS",
  EMAIL = "EMAIL",
  PUSH = "PUSH",
}

export enum NotificationStatus {
  PENDING = "PENDING",
  SENT = "SENT",
  DELIVERED = "DELIVERED",
  FAILED = "FAILED",
  READ = "READ",
}

// ── Feedback Enums ────────────────────────────

export enum ReviewStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  FLAGGED = "FLAGGED",
}

export enum FeedbackType {
  GENERAL = "GENERAL",
  DELIVERY = "DELIVERY",
  PAYMENT = "PAYMENT",
  PRODUCT_QUALITY = "PRODUCT_QUALITY",
  CUSTOMER_SERVICE = "CUSTOMER_SERVICE",
}

// ── Audit Enums ───────────────────────────────

export enum TransactionAuditType {
  SALE = "SALE",
  REFUND = "REFUND",
  PAYMENT = "PAYMENT",
  STOCK_ADJUSTMENT = "STOCK_ADJUSTMENT",
  PRICE_CHANGE = "PRICE_CHANGE",
  JOURNAL_POST = "JOURNAL_POST",
  CAMPAIGN_APPLY = "CAMPAIGN_APPLY",
  CAMPAIGN_PUBLISH = "CAMPAIGN_PUBLISH",
  PO_RECEIPT = "PO_RECEIPT",
  SUPPLIER_PAYMENT = "SUPPLIER_PAYMENT",
  LOYALTY_ADJUST = "LOYALTY_ADJUST",
}

// ═══════════════════════════════════════════════
// INTERFACES — Shape of data flowing through
// the entire system
// ═══════════════════════════════════════════════

// ── Base ──────────────────────────────────────

export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// ── Auth & Roles ──────────────────────────────

export interface Role extends BaseEntity {
  name: string;
  code: UserRoleCode;
  description: string;
  isSystem: boolean;
}

export interface Permission {
  id: string;
  code: string;
  name: string;
  module: string;
  description: string;
}

export interface RolePermission {
  roleId: string;
  permissionId: string;
  accessLevel: AccessLevel;
}

export interface MenuItem {
  id: string;
  parentId: string | null;
  label: string;
  icon: string;
  route: string;
  sortOrder: number;
  module: string;
  requiredPermissionCode: string;
  isActive: boolean;
  children?: MenuItem[];
}

export interface UserMenuTree {
  items: MenuItem[];
  role: Pick<Role, "id" | "name" | "code">;
}

export interface User extends BaseEntity {
  email: string;
  firstName: string;
  lastName: string;
  roleId: string;
  role?: Role;
  storeId: string;
  isActive: boolean;
  lastLogin: Date | null;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LoginResponse {
  user: Omit<User, "passwordHash">;
  tokens: AuthTokens;
  menu: UserMenuTree;
}

// ── Products ──────────────────────────────────

export interface Category extends BaseEntity {
  name: string;
  slug: string;
  parentId: string | null;
  imageUrl: string | null;
  sortOrder: number;
  isActive: boolean;
  children?: Category[];
}

export interface Brand extends BaseEntity {
  name: string;
  slug: string;
  logoUrl: string | null;
  description: string | null;
}

export interface Product extends BaseEntity {
  sku: string;
  name: string;
  slug: string;
  description: string | null;
  brandId: string;
  categoryId: string;
  basePrice: number;
  salePrice: number | null;
  costPrice: number;
  weight: number | null;
  dimensions: string | null;
  isActive: boolean;
  brand?: Brand;
  category?: Category;
  images?: ProductImage[];
  variants?: ProductVariant[];
  tags?: string[];
  catalogueCode?: string;
  averageRating?: number;
  reviewCount?: number;
}

export interface ProductImage {
  id: string;
  productId: string;
  imageUrl: string;
  altText: string;
  sortOrder: number;
  isPrimary: boolean;
}

export interface ProductVariant {
  id: string;
  productId: string;
  variantName: string;
  skuSuffix: string;
  priceAdjustment: number;
  stockQty: number;
}

// ── Inventory ─────────────────────────────────

export interface InventoryItem {
  id: string;
  productId: string;
  variantId: string | null;
  storeId: string;
  quantity: number;
  reorderLevel: number;
  reorderQty: number;
  lastRestockedAt: Date | null;
  product?: Product;
}

export interface StockMovement extends BaseEntity {
  productId: string;
  storeId: string;
  movementType: StockMovementType;
  quantity: number;
  referenceId: string | null;
  referenceType: string | null;
  notes: string | null;
  createdBy: string;
}

// ── Orders ────────────────────────────────────

export interface Order extends BaseEntity {
  orderNumber: string;
  customerId: string | null;
  storeId: string;
  channel: OrderChannel;
  status: OrderStatus;
  subtotal: number;
  taxAmount: number;
  discountAmount: number;
  total: number;
  shippingAddress: string | null;
  notes: string | null;
  items?: OrderItem[];
  payments?: Payment[];
  customer?: Customer;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  variantId: string | null;
  quantity: number;
  unitPrice: number;
  discount: number;
  total: number;
  product?: Product;
}

export interface Payment extends BaseEntity {
  orderId: string;
  method: PaymentMethod;
  amount: number;
  reference: string | null;
  status: PaymentStatus;
  providerResponse: Record<string, unknown> | null;
}

// ── Customers ─────────────────────────────────

export interface Customer extends BaseEntity {
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string;
  isGuest: boolean;
  loyaltyPoints: number;
}

export interface Address extends BaseEntity {
  customerId: string;
  label: string;
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  county: string;
  postalCode: string | null;
  isDefault: boolean;
}

// ── Accounting ────────────────────────────────

export interface ChartOfAccount extends BaseEntity {
  accountNumber: string;
  name: string;
  accountTypeId: string;
  accountGroupId: string | null;
  parentAccountId: string | null;
  description: string | null;
  isActive: boolean;
  isSystem: boolean;
  isBankAccount: boolean;
  currency: string;
  currentBalance?: number;
}

export interface JournalEntry extends BaseEntity {
  entryNumber: string;
  fiscalPeriodId: string;
  entryDate: Date;
  description: string;
  sourceType: JournalSourceType;
  sourceId: string | null;
  status: JournalEntryStatus;
  isReversing: boolean;
  reversedEntryId: string | null;
  postedBy: string | null;
  postedAt: Date | null;
  approvedBy: string | null;
  approvedAt: Date | null;
  createdBy: string;
  lines?: JournalLine[];
}

export interface JournalLine {
  id: string;
  journalEntryId: string;
  accountId: string;
  debitAmount: number;
  creditAmount: number;
  description: string | null;
  costCentreId: string | null;
  taxCodeId: string | null;
  account?: ChartOfAccount;
}

export interface FiscalYear extends BaseEntity {
  name: string;
  startDate: Date;
  endDate: Date;
  status: FiscalPeriodStatus;
  closedBy: string | null;
  closedAt: Date | null;
  periods?: FiscalPeriod[];
}

export interface FiscalPeriod extends BaseEntity {
  fiscalYearId: string;
  name: string;
  periodNumber: number;
  startDate: Date;
  endDate: Date;
  status: FiscalPeriodStatus;
}

export interface AccountBalance {
  id: string;
  accountId: string;
  fiscalPeriodId: string;
  openingBalance: number;
  totalDebits: number;
  totalCredits: number;
  closingBalance: number;
  lastUpdatedAt: Date;
  account?: ChartOfAccount;
}

export interface TrialBalanceRow {
  accountNumber: string;
  accountName: string;
  accountType: AccountType;
  debitBalance: number;
  creditBalance: number;
}

// ── Campaigns ─────────────────────────────────

export interface Campaign extends BaseEntity {
  name: string;
  slug: string;
  description: string | null;
  campaignType: CampaignType;
  status: CampaignStatus;
  startDate: Date;
  endDate: Date;
  channels: CampaignChannel;
  priority: number;
  bannerImageUrl: string | null;
  termsText: string | null;
  budgetLimit: number | null;
  totalRedeemed: number;
  createdBy: string;
  rules?: CampaignRule[];
  promoCodes?: PromoCode[];
}

export interface CampaignRule {
  id: string;
  campaignId: string;
  ruleType:
    | "PRODUCT"
    | "CATEGORY"
    | "BRAND"
    | "ORDER_MINIMUM"
    | "CUSTOMER_SEGMENT";
  targetId: string | null;
  discountValue: number;
  discountType: "PERCENTAGE" | "FIXED";
  maxUsesTotal: number | null;
  maxUsesPerCustomer: number | null;
  minQuantity: number;
  currentUses: number;
}

export interface PromoCode {
  id: string;
  campaignId: string;
  code: string;
  isSingleUse: boolean;
  maxUses: number | null;
  currentUses: number;
  isActive: boolean;
}

// ── Feedback ──────────────────────────────────

export interface ProductReview extends BaseEntity {
  productId: string;
  customerId: string;
  orderId: string | null;
  rating: number;
  title: string;
  body: string;
  isVerifiedPurchase: boolean;
  status: ReviewStatus;
  adminResponse: string | null;
  product?: Product;
  customer?: Customer;
}

export interface StoreFeedback extends BaseEntity {
  customerId: string;
  orderId: string | null;
  feedbackType: FeedbackType;
  rating: number;
  comment: string;
  status: "NEW" | "REVIEWED" | "ACTIONED" | "CLOSED";
  assignedTo: string | null;
  resolutionNotes: string | null;
}

// ── Transaction Audit ─────────────────────────

export interface TransactionAuditEntry {
  id: string;
  transactionType: TransactionAuditType;
  referenceType: string;
  referenceId: string;
  channel: OrderChannel | "ERP";
  storeId: string | null;
  userId: string;
  customerId: string | null;
  amount: number;
  currency: string;
  description: string;
  metadataJson: Record<string, unknown>;
  hashChain: string;
  createdAt: Date;
}

// ═══════════════════════════════════════════════
// API RESPONSE WRAPPERS — Every API endpoint
// returns data in one of these shapes
// ═══════════════════════════════════════════════

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  meta: {
    total: number;
    page: number;
    perPage: number;
    totalPages: number;
  };
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
  statusCode: number;
}
