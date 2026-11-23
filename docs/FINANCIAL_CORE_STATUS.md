# AKB Central Financial Core

## Current status
- UI: sandbox preview implemented in the feature branch.
- Database: migration draft only; not applied.
- Supabase Development Branch: creation attempted after explicit cost approval, but Supabase returned `Branching is supported only on the Pro plan or above`.
- No production database writes, migrations, deployments, or real-money provider calls were made.

## Ledger design
- Integer minor units per currency.
- Idempotent transaction keys scoped to tenant.
- One journal per posted transaction.
- Equal debit and credit entries; atomic posting must be implemented server-side with row locks.
- Posted entries are immutable; corrections use compensating reversals.
- Provider connections remain disabled until sandbox credentials, callback verification and compliance review are complete.

## Important
The current UI contains illustrative client-side sandbox records only. It does not represent persisted balances and does not move real funds. Do not enable production rails until the database posting engine, RLS/authorization, provider adapters, webhook signature verification, reconciliation and tests are implemented and verified.
