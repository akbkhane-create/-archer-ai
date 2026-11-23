-- AKB Central Financial Core - proposed isolated schema migration
-- STATUS: NOT APPLIED. Supabase development branch creation was blocked by plan eligibility.
-- Monetary values use integer minor units (paisa/cents); no floating-point arithmetic.
-- No existing public tables are altered or dropped.

begin;
create schema if not exists akb_finance;
revoke all on schema akb_finance from public, anon, authenticated;
grant usage on schema akb_finance to service_role;

create table if not exists akb_finance.accounts (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null,
  owner_user_id uuid,
  account_code text not null,
  display_name text not null,
  account_type text not null check (account_type in ('wallet','clearing','fee','suspense','external')),
  currency char(3) not null,
  status text not null default 'active' check (status in ('active','frozen','closed')),
  created_at timestamptz not null default now(),
  unique (tenant_id, account_code, currency)
);

create table if not exists akb_finance.transactions (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null,
  idempotency_key text not null,
  transaction_type text not null check (transaction_type in ('transfer','deposit','withdrawal','adjustment','reversal')),
  status text not null default 'pending' check (status in ('pending','posted','failed','reversed')),
  currency char(3) not null,
  amount_minor bigint not null check (amount_minor > 0),
  description text,
  created_by uuid,
  created_at timestamptz not null default now(),
  posted_at timestamptz,
  unique (tenant_id, idempotency_key)
);

create table if not exists akb_finance.journals (
  id uuid primary key default gen_random_uuid(),
  transaction_id uuid not null unique references akb_finance.transactions(id),
  tenant_id uuid not null,
  currency char(3) not null,
  created_at timestamptz not null default now()
);

create table if not exists akb_finance.ledger_entries (
  id bigint generated always as identity primary key,
  journal_id uuid not null references akb_finance.journals(id),
  account_id uuid not null references akb_finance.accounts(id),
  tenant_id uuid not null,
  currency char(3) not null,
  side text not null check (side in ('debit','credit')),
  amount_minor bigint not null check (amount_minor > 0),
  created_at timestamptz not null default now()
);
create index if not exists ledger_entries_account_time_idx on akb_finance.ledger_entries(account_id, created_at desc);
create index if not exists transactions_tenant_time_idx on akb_finance.transactions(tenant_id, created_at desc);

create table if not exists akb_finance.provider_connections (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null,
  provider_code text not null,
  rail_type text not null check (rail_type in ('bank','mfs','card','crypto','international')),
  environment text not null default 'sandbox' check (environment in ('sandbox','production')),
  status text not null default 'disabled' check (status in ('disabled','configured','active','suspended')),
  secret_reference text,
  created_at timestamptz not null default now(),
  unique (tenant_id, provider_code, environment)
);

create table if not exists akb_finance.provider_events (
  id uuid primary key default gen_random_uuid(),
  provider_connection_id uuid references akb_finance.provider_connections(id),
  provider_event_id text not null,
  payload_hash text not null,
  processing_status text not null default 'received' check (processing_status in ('received','verified','processed','rejected')),
  received_at timestamptz not null default now(),
  unique (provider_connection_id, provider_event_id)
);

create table if not exists akb_finance.reconciliation_runs (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null,
  provider_code text not null,
  currency char(3) not null,
  period_start timestamptz not null,
  period_end timestamptz not null,
  status text not null default 'pending' check (status in ('pending','matched','discrepancy','closed')),
  created_at timestamptz not null default now(),
  check (period_end > period_start)
);

-- Defense in depth: RLS enabled even though the schema is not exposed to browser roles.
alter table akb_finance.accounts enable row level security;
alter table akb_finance.transactions enable row level security;
alter table akb_finance.journals enable row level security;
alter table akb_finance.ledger_entries enable row level security;
alter table akb_finance.provider_connections enable row level security;
alter table akb_finance.provider_events enable row level security;
alter table akb_finance.reconciliation_runs enable row level security;

-- No direct browser table grants or client-side posting policies.
-- Posting must be implemented by a reviewed server-side function/Edge Function that:
-- 1) authenticates tenant/user and validates account ownership;
-- 2) locks affected account rows FOR UPDATE;
-- 3) checks idempotency and available funds;
-- 4) writes one transaction, one journal and equal debit/credit entries atomically;
-- 5) never edits/deletes posted ledger entries; corrections use compensating reversals.
commit;
