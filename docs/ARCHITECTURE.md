# Architecture

## Product scope
AI NEURON BRAIN is a multi-tenant customer-support and business-operations platform with omnichannel conversations, shared customer identity, consent-aware memory, knowledge retrieval, AI workflows and human escalation.

## System boundaries
- **Web application:** tenant workspace, inbox, customer profiles, knowledge management, analytics and settings.
- **Supabase Postgres:** source of truth for tenant, customer, conversation, ticket, memory, knowledge, model, integration, approval, automation and audit data.
- **Deno Edge Functions:** trusted boundary for webhooks, orchestration, provisioning and external provider calls.
- **AI orchestration:** provider-neutral routing based on task, cost, latency, availability and data sensitivity.
- **MCP hub:** controlled tool discovery and execution with declared schemas, tenant scope, permissions and audit trail.
- **Channel adapters:** WhatsApp, Messenger, website chat, Instagram, Telegram and email.

## Existing database foundation
Supabase project `yrakgnfiyaspokucastt` contains 15 public tables with RLS enabled:
`tenants`, `tenant_members`, `customers`, `conversations`, `messages`, `support_tickets`, `customer_memories`, `knowledge_sources`, `knowledge_chunks`, `ai_model_profiles`, `integration_connections`, `ai_agent_settings`, `approval_requests`, `automation_runs`, `audit_logs`.

The vector extension is installed. Select embedding dimensions only after choosing the embedding model; never guess them.

## Request lifecycle
1. Verify webhook signature or authenticated session.
2. Resolve tenant membership and channel identity.
3. Normalize and persist inbound event idempotently.
4. Load conversation context, approved knowledge and consent-eligible memory.
5. Apply tenant policy, autonomy mode, tool allowlists and model routing.
6. Generate a response or request approval for a sensitive action.
7. Persist response, usage metadata and audit event.
8. Deliver through the originating channel with safe retry handling.

## Implementation sequence
1. Repository scaffold, typed configuration and health checks.
2. Authenticated tenant workspace and protected routes.
3. Conversation inbox and customer/message APIs.
4. AI orchestration contracts and mock provider.
5. Consent-aware memory and retrieval.
6. Approval workflow, audit trail and MCP tool registry.
7. Channel adapters and webhook verification.
8. Observability, tests and production hardening.
