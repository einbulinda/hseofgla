# ──────────────────────────────────────────────
# House of Glamour — Local PostgreSQL Setup
# ──────────────────────────────────────────────
# Run once to create the database and user.
#
# Prerequisites:
#   - PostgreSQL 16+ installed via Windows installer
#   - psql.exe on your PATH
#     (typically: C:\Program Files\PostgreSQL\16\bin)
#
# Usage (from project root):
#   .\scripts\setup-local-db.ps1
# ──────────────────────────────────────────────

$DB_NAME = "hseofgla"
$DB_USER = "hog_user"
$DB_PASSWORD = "hog_password"

# The Windows PostgreSQL installer creates a 'postgres' superuser.
# If yours is different, change this:
$PG_SUPERUSER = "postgres"

Write-Host ""
Write-Host "House of Glamour — Database Setup" -ForegroundColor Yellow
Write-Host "──────────────────────────────────" -ForegroundColor Yellow

# Check if psql is available
try {
    $null = Get-Command psql -ErrorAction Stop
    Write-Host "[OK] psql found on PATH" -ForegroundColor Green
}
catch {
    Write-Host "[FAIL] psql not found on PATH" -ForegroundColor Red
    Write-Host ""
    Write-Host "Add PostgreSQL bin directory to your PATH:" -ForegroundColor White
    Write-Host '  $env:PATH += ";C:\Program Files\PostgreSQL\16\bin"' -ForegroundColor Gray
    Write-Host ""
    Write-Host "Or add it permanently via:" -ForegroundColor White
    Write-Host "  System Properties > Environment Variables > Path > Edit" -ForegroundColor Gray
    exit 1
}

# Check if PostgreSQL is running
$pgReady = psql -U $PG_SUPERUSER -c "SELECT 1;" 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "[FAIL] Cannot connect to PostgreSQL" -ForegroundColor Red
    Write-Host ""
    Write-Host "Make sure the PostgreSQL service is running:" -ForegroundColor White
    Write-Host "  net start postgresql-x64-16" -ForegroundColor Gray
    Write-Host ""
    Write-Host "If it prompts for a password, you may need to edit" -ForegroundColor White
    Write-Host "pg_hba.conf to allow local connections with 'trust' or 'md5'." -ForegroundColor Gray
    exit 1
}
Write-Host "[OK] PostgreSQL is running" -ForegroundColor Green

# Create user
Write-Host ""
Write-Host "Creating user: $DB_USER" -ForegroundColor Cyan
$userExists = psql -U $PG_SUPERUSER -tAc "SELECT 1 FROM pg_roles WHERE rolname='$DB_USER';"
if ($userExists -ne "1") {
    psql -U $PG_SUPERUSER -c "CREATE USER $DB_USER WITH PASSWORD '$DB_PASSWORD' CREATEDB;"
    Write-Host "  [OK] User created" -ForegroundColor Green
}
else {
    Write-Host "  [OK] User already exists" -ForegroundColor Green
}

# Create database
Write-Host "Creating database: $DB_NAME" -ForegroundColor Cyan
$dbExists = psql -U $PG_SUPERUSER -tAc "SELECT 1 FROM pg_database WHERE datname='$DB_NAME';"
if ($dbExists -ne "1") {
    psql -U $PG_SUPERUSER -c "CREATE DATABASE $DB_NAME OWNER $DB_USER;"
    Write-Host "  [OK] Database created" -ForegroundColor Green
}
else {
    Write-Host "  [OK] Database already exists" -ForegroundColor Green
}

# Enable extensions
Write-Host "Enabling extensions" -ForegroundColor Cyan
psql -U $PG_SUPERUSER -d $DB_NAME -c 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";' 2>$null
psql -U $PG_SUPERUSER -d $DB_NAME -c 'CREATE EXTENSION IF NOT EXISTS "pgcrypto";' 2>$null
Write-Host "  [OK] uuid-ossp and pgcrypto enabled" -ForegroundColor Green

# Summary
Write-Host ""
Write-Host "──────────────────────────────────" -ForegroundColor Yellow
Write-Host "Database setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Connection string:" -ForegroundColor White
Write-Host "  postgresql://${DB_USER}:${DB_PASSWORD}@localhost:5432/${DB_NAME}?schema=public" -ForegroundColor Gray
Write-Host ""
Write-Host "Next steps:" -ForegroundColor White
Write-Host "  1. Verify your .env has the correct DATABASE_URL" -ForegroundColor Gray
Write-Host "  2. Run: pnpm install" -ForegroundColor Gray
Write-Host "  3. Run: pnpm db:generate" -ForegroundColor Gray
Write-Host "  4. Run: pnpm db:migrate" -ForegroundColor Gray
Write-Host "  5. Run: pnpm db:seed" -ForegroundColor Gray
Write-Host "  6. Run: pnpm dev:api" -ForegroundColor Gray
Write-Host ""