import { PrismaClient } from "@prisma/client";
import { SYSTEM_ACCOUNTS, SYSTEM_ROLES } from "@hog/config";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding House of Glamour database...\n");

  // ── 1. ROLES ────────────────────────────────
  console.log("Seeding roles...");
  for (const role of SYSTEM_ROLES) {
    await prisma.role.upsert({
      where: { code: role.code },
      update: {},
      create: {
        name: role.name,
        code: role.code,
        description: role.description,
        isSystem: true,
      },
    });
  }
  console.log(`  ${SYSTEM_ROLES.length} roles seeded\n`);

  // ── 2. ACCOUNT TYPES ───────────────────────
  console.log("Seeding account types...");
  const accountTypes = [
    { name: "ASSET", normalBalance: "DEBIT", displayOrder: 1 },
    { name: "LIABILITY", normalBalance: "CREDIT", displayOrder: 2 },
    { name: "EQUITY", normalBalance: "CREDIT", displayOrder: 3 },
    { name: "REVENUE", normalBalance: "CREDIT", displayOrder: 4 },
    { name: "EXPENSE", normalBalance: "DEBIT", displayOrder: 5 },
  ];

  const typeMap: Record<string, string> = {};
  for (const at of accountTypes) {
    const result = await prisma.accountType.upsert({
      where: { name: at.name },
      update: {},
      create: at,
    });
    typeMap[at.name] = result.id;
  }
  console.log("  5 account types seeded\n");

  // ── 3. ACCOUNT GROUPS ──────────────────────
  console.log("Seeding account groups...");
  const accountGroups = [
    {
      name: "Cash & Bank",
      codePrefix: "10",
      accountType: "ASSET",
      sortOrder: 1,
    },
    {
      name: "Receivables",
      codePrefix: "11",
      accountType: "ASSET",
      sortOrder: 2,
    },
    { name: "Inventory", codePrefix: "12", accountType: "ASSET", sortOrder: 3 },
    {
      name: "Prepaid Expenses",
      codePrefix: "13",
      accountType: "ASSET",
      sortOrder: 4,
    },
    {
      name: "Fixed Assets",
      codePrefix: "15",
      accountType: "ASSET",
      sortOrder: 5,
    },
    {
      name: "Current Liabilities",
      codePrefix: "20",
      accountType: "LIABILITY",
      sortOrder: 1,
    },
    {
      name: "Tax Liabilities",
      codePrefix: "21",
      accountType: "LIABILITY",
      sortOrder: 2,
    },
    {
      name: "Accruals & Payroll",
      codePrefix: "22",
      accountType: "LIABILITY",
      sortOrder: 3,
    },
    {
      name: "Customer Deposits",
      codePrefix: "24",
      accountType: "LIABILITY",
      sortOrder: 4,
    },
    {
      name: "Owner Equity",
      codePrefix: "30",
      accountType: "EQUITY",
      sortOrder: 1,
    },
    {
      name: "Retained Earnings",
      codePrefix: "31",
      accountType: "EQUITY",
      sortOrder: 2,
    },
    {
      name: "Sales Revenue",
      codePrefix: "40",
      accountType: "REVENUE",
      sortOrder: 1,
    },
    {
      name: "Other Income",
      codePrefix: "45",
      accountType: "REVENUE",
      sortOrder: 2,
    },
    {
      name: "Cost of Goods Sold",
      codePrefix: "50",
      accountType: "EXPENSE",
      sortOrder: 1,
    },
    {
      name: "Operating Expenses",
      codePrefix: "60",
      accountType: "EXPENSE",
      sortOrder: 2,
    },
    {
      name: "Other Expenses",
      codePrefix: "70",
      accountType: "EXPENSE",
      sortOrder: 3,
    },
  ];

  const groupMap: Record<string, string> = {};
  for (const ag of accountGroups) {
    const result = await prisma.accountGroup.upsert({
      where: {
        accountTypeId_name: {
          accountTypeId: typeMap[ag.accountType],
          name: ag.name,
        },
      },
      update: {},
      create: {
        name: ag.name,
        codePrefix: ag.codePrefix,
        description: "",
        sortOrder: ag.sortOrder,
        accountTypeId: typeMap[ag.accountType],
      },
    });
    groupMap[ag.codePrefix] = result.id;
  }
  console.log(`  ${accountGroups.length} account groups seeded\n`);

  // ── 4. CHART OF ACCOUNTS ───────────────────
  console.log("Seeding chart of accounts...");

  // Helper to find group by code prefix
  function findGroup(accountNumber: string): string | undefined {
    const prefix = accountNumber.substring(0, 2);
    return groupMap[prefix];
  }

  // Helper to find account type by account number range
  function findType(accountNumber: string): string {
    const num = parseInt(accountNumber, 10);
    if (num < 2000) return typeMap["ASSET"];
    if (num < 3000) return typeMap["LIABILITY"];
    if (num < 4000) return typeMap["EQUITY"];
    if (num < 5000) return typeMap["REVENUE"];
    return typeMap["EXPENSE"];
  }

  const accounts: Array<{
    number: string;
    name: string;
    isBank?: boolean;
  }> = [
    // Assets (1000–1999)
    { number: "1000", name: "Cash at Bank", isBank: true },
    { number: "1010", name: "M-Pesa Float", isBank: true },
    { number: "1020", name: "Petty Cash", isBank: true },
    { number: "1100", name: "Accounts Receivable" },
    { number: "1200", name: "Inventory (Merchandise)" },
    { number: "1300", name: "Prepaid Expenses" },
    { number: "1500", name: "Property & Equipment" },
    { number: "1510", name: "Accumulated Depreciation" },

    // Liabilities (2000–2999)
    { number: "2000", name: "Accounts Payable" },
    { number: "2100", name: "VAT Payable (Output)" },
    { number: "2110", name: "VAT Receivable (Input)" },
    { number: "2200", name: "Accrued Expenses" },
    { number: "2300", name: "Salaries Payable" },
    { number: "2400", name: "Customer Deposits / Prepayments" },

    // Equity (3000–3999)
    { number: "3000", name: "Owner's Capital" },
    { number: "3100", name: "Retained Earnings" },
    { number: "3200", name: "Current Year Earnings" },
    { number: "3300", name: "Drawings / Distributions" },

    // Revenue (4000–4999)
    { number: "4000", name: "Sales Revenue - Online" },
    { number: "4010", name: "Sales Revenue - POS" },
    { number: "4100", name: "Sales Returns & Allowances" },
    { number: "4200", name: "Sales Discounts" },
    { number: "4500", name: "Other Income" },

    // COGS (5000–5999)
    { number: "5000", name: "Cost of Goods Sold" },
    { number: "5100", name: "Purchase Discounts" },
    { number: "5200", name: "Freight-In" },
    { number: "5300", name: "Inventory Write-Offs" },

    // Operating Expenses (6000–6999)
    { number: "6000", name: "Salaries & Wages" },
    { number: "6100", name: "Rent Expense" },
    { number: "6200", name: "Utilities" },
    { number: "6300", name: "Marketing & Advertising" },
    { number: "6400", name: "Delivery / Shipping Costs" },
    { number: "6500", name: "Depreciation Expense" },
    { number: "6600", name: "Payment Gateway Fees (M-Pesa/Stripe)" },
    { number: "6700", name: "Office Supplies" },
    { number: "6800", name: "Insurance" },
    { number: "6900", name: "Miscellaneous Expenses" },

    // Other (7000–7999)
    { number: "7000", name: "Interest Income" },
    { number: "7100", name: "Interest Expense" },
    { number: "7200", name: "Foreign Exchange Gain/Loss" },
    { number: "7500", name: "Tax Expense (Income Tax)" },
  ];

  let accountCount = 0;
  for (const acct of accounts) {
    await prisma.chartOfAccount.upsert({
      where: { accountNumber: acct.number },
      update: {},
      create: {
        accountNumber: acct.number,
        name: acct.name,
        accountTypeId: findType(acct.number),
        accountGroupId: findGroup(acct.number) || null,
        isActive: true,
        isSystem: true,
        isBankAccount: acct.isBank || false,
        currency: "KES",
      },
    });
    accountCount++;
  }
  console.log(`  ${accountCount} accounts seeded\n`);

  // ── 5. TAX CODES ───────────────────────────
  console.log("Seeding tax codes...");

  // We need the VAT Output and Input account IDs
  const vatOutput = await prisma.chartOfAccount.findUnique({
    where: { accountNumber: "2100" },
  });
  const vatInput = await prisma.chartOfAccount.findUnique({
    where: { accountNumber: "2110" },
  });

  if (vatOutput && vatInput) {
    const taxCodes = [
      { code: "VAT-STD", name: "Standard VAT (16%)", rate: 0.16 },
      { code: "VAT-ZERO", name: "Zero Rated", rate: 0 },
      { code: "VAT-EXEMPT", name: "VAT Exempt", rate: 0 },
    ];

    for (const tc of taxCodes) {
      await prisma.taxCode.upsert({
        where: { code: tc.code },
        update: {},
        create: {
          code: tc.code,
          name: tc.name,
          rate: tc.rate,
          accountIdOutput: vatOutput.id,
          accountIdInput: vatInput.id,
          isActive: true,
        },
      });
    }
    console.log("  3 tax codes seeded\n");
  }

  // ── 6. COST CENTRES ────────────────────────
  console.log("Seeding cost centres...");
  const costCentres = [
    { code: "STORE-OPS", name: "Store Operations" },
    { code: "ONLINE-FUL", name: "Online Fulfilment" },
    { code: "ADMIN", name: "Administration" },
  ];

  for (const cc of costCentres) {
    await prisma.costCentre.upsert({
      where: { code: cc.code },
      update: {},
      create: { ...cc, isActive: true },
    });
  }
  console.log("  3 cost centres seeded\n");

  // ── 7. DEFAULT STORE ───────────────────────
  console.log("Seeding default store...");
  await prisma.store.upsert({
    where: { id: "00000000-0000-0000-0000-000000000001" },
    update: {},
    create: {
      id: "00000000-0000-0000-0000-000000000001",
      name: "Magharibi Place",
      address:
        "Magharibi Place, Ground Floor, Mai Mahiu Road, Off Lang'ata Road, Near T-Mall, Nairobi",
      phone: "+254722522119",
      isActive: true,
      timezone: "Africa/Nairobi",
    },
  });
  console.log("  Default store seeded\n");

  // ── DONE ───────────────────────────────────
  console.log("──────────────────────────────────");
  console.log("Seed complete!");
  console.log(`  Roles:          ${SYSTEM_ROLES.length}`);
  console.log(`  Account Types:  ${accountTypes.length}`);
  console.log(`  Account Groups: ${accountGroups.length}`);
  console.log(`  Accounts (COA): ${accountCount}`);
  console.log(`  Tax Codes:      3`);
  console.log(`  Cost Centres:   ${costCentres.length}`);
  console.log(`  Stores:         1`);
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
