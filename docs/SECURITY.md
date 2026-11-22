# Security baseline

- Never commit secrets, access tokens, service-role keys or private customer data.
- Frontend may use only the Supabase publishable key; privileged keys stay in Edge Function secrets.
- Every tenant-owned query must be tenant-scoped and protected by RLS.
- Do not trust user-editable profile metadata for authorization.
- Validate session and tenant membership on every privileged request.
- Verify webhook signatures and implement idempotency.
- Restrict AI tools by tenant, role, schema, allowlist and autonomy mode.
- Require approval for money movement, destructive changes, external publication and other high-impact actions.
- Store credentials in a secret manager; database fields contain references, never raw credentials.
- Apply consent, purpose limitation, retention and deletion controls to customer memory.
- Emit audit events for privileged actions.
- Add rate limits, request size limits, timeouts and safe error responses.
