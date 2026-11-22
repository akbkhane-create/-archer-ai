// Minimal Edge Function health endpoint. No privileged actions or secrets are exposed.
Deno.serve(() => {
  return Response.json(
    {
      service: "ai-neuron-brain",
      component: "edge-health",
      status: "ok",
      timestamp: new Date().toISOString(),
    },
    {
      headers: {
        "cache-control": "no-store",
        "x-content-type-options": "nosniff",
      },
    },
  );
});
