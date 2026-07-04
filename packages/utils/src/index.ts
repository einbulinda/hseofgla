// ──────────────────────────────────────────────
// House of Glamour — Shared Utilities
//
// Pure functions used across all apps.
// No external dependencies — only TypeScript.
// ──────────────────────────────────────────────

/**
 * Format amount in Kenyan Shillings.
 * 1200 → "Ksh 1,200.00"
 */

export function formatKsh(amount: number): string {
  return `Ksh ${amount.toLocaleString("en-KE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

/**
 * Short Ksh format without decimals for display.
 * 1200 → "Ksh 1,200"
 */
export function formatKshShort(amount: number): string {
  return `Ksh ${Math.round(amount).toLocaleString("en-KE")}`;
}

/**
 * Normalise any Kenyan phone format to +254.
 * "0722522119" → "+254722522119"
 * "254722522119" → "+254722522119"
 * "+254722522119" → "+254722522119" (no-op)
 */
export function normalisePhone(phone: string): string {
  const cleaned = phone.replace(/[\s\-()]/g, "");
  if (cleaned.startsWith("+254")) return cleaned;
  if (cleaned.startsWith("254")) return `+${cleaned}`;
  if (cleaned.startsWith("0")) return `+254${cleaned.slice(1)}`;
  return `+254${cleaned}`;
}

/**
 * Slugify a string for URLs.
 * "12Pc Goldline Cup & Saucer" → "12pc-goldline-cup-saucer"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");
}

/**
 * Generate order number.
 * Format: HOG-20260416-A3F2
 */
export function generateOrderNumber(): string {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `HOG-${date}-${rand}`;
}

/**
 * Generate journal entry number.
 * Format: JE-202604-0001
 */
export function generateJournalNumber(sequence: number): string {
  const ym = new Date().toISOString().slice(0, 7).replace("-", "");
  return `JE-${ym}-${String(sequence).padStart(4, "0")}`;
}

/**
 * Calculate VAT breakdown from a gross (VAT-inclusive) amount.
 * Kenya standard VAT = 16%.
 *
 * Example: calculateVat(11600)
 *   → { net: 10000, vat: 1600, gross: 11600 }
 */
export function calculateVat(
  grossAmount: number,
  vatRate = 0.16,
): { net: number; vat: number; gross: number } {
  const net = +(grossAmount / (1 + vatRate)).toFixed(2);
  const vat = +(grossAmount - net).toFixed(2);
  return { net, vat, gross: grossAmount };
}

/**
 * Calculate VAT to add on top of a net (VAT-exclusive) amount.
 *
 * Example: addVat(10000)
 *   → { net: 10000, vat: 1600, gross: 11600 }
 */
export function addVat(
  netAmount: number,
  vatRate = 0.16,
): { net: number; vat: number; gross: number } {
  const vat = +(netAmount * vatRate).toFixed(2);
  const gross = +(netAmount + vat).toFixed(2);
  return { net: netAmount, vat, gross };
}

/**
 * Sleep for a given number of milliseconds.
 * Used in retry logic (M-Pesa callback polling, notification retries).
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * SHA-256 hash for the transaction audit hash chain.
 * Works in both Node.js and browser environments.
 */
export async function sha256(input: string): Promise<string> {
  // Node.js path (API server)
  if (typeof globalThis.crypto?.subtle === "undefined") {
    const { createHash } = await import("crypto");
    return createHash("sha256").update(input).digest("hex");
  }
  // Browser path (frontends — only if audit display needs verification)
  const data = new TextEncoder().encode(input);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Mask a phone number for display.
 * "+254722522119" → "+254***522119"
 */
export function maskPhone(phone: string): string {
  if (phone.length < 8) return phone;
  const start = phone.slice(0, 4);
  const end = phone.slice(-3);
  return `${start}***${end}`;
}

/**
 * Mask an email for display.
 * "john.doe@gmail.com" → "jo***@gmail.com"
 */
export function maskEmail(email: string): string {
  const [local, domain] = email.split("@");
  if (!domain) return email;
  const visible = local.slice(0, 2);
  return `${visible}***@${domain}`;
}

/**
 * Generate a random string of given length.
 * Used for promo codes, temporary passwords, etc.
 */
export function randomString(length: number): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O/1/I to avoid confusion
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
