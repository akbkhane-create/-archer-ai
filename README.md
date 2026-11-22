# AI NEURON BRAIN

A production-oriented, multi-tenant AI customer-support and business-automation platform.

## Project foundation
- Frontend: React + TypeScript
- Backend: Supabase Postgres + Deno Edge Functions
- Data isolation: tenant-scoped Row Level Security (RLS)
- AI: provider-neutral multi-model routing
- Integrations: MCP connector hub and channel adapters
- Operating model: hybrid AI + human handoff with controlled autonomy

## Supabase
Project ref: `yrakgnfiyaspokucastt` | Region: `us-east-1`

The database foundation contains 15 RLS-enabled public tables. Never expose service-role keys or provider credentials in frontend code or commit them.

## Safety principles
- Tenant isolation is mandatory.
- Privileged provisioning and secrets access stay server-side.
- AI actions use allowlists, audit logs and approval gates.
- Customer memory respects consent, retention and deletion requests.
- No destructive schema or repository changes without explicit approval.

See [Architecture](docs/ARCHITECTURE.md), [Security](docs/SECURITY.md), and [Roadmap](docs/ROADMAP.md).
