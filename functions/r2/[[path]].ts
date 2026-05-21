import type { EventContext } from "@cloudflare/workers-types";

interface Env {
  R2_BUCKET: R2Bucket;
}

export async function onRequestGet({
  params,
  env,
}: EventContext<Env, "path", Record<string, unknown>>) {
  const key = (params.path as string[]).join("/");
  const object = await env.R2_BUCKET.get(key);

  if (!object) {
    return new Response("Not found", { status: 404 });
  }

  const maxAgeSeconds = 7 * 24 * 60 * 60; // 7 days
  const staleWhileRevalidateSeconds = 24 * 60 * 60; // 1 day
  return new Response(object.body, {
    headers: {
      "Content-Type":
        object.httpMetadata?.contentType ?? "application/octet-stream",
      "Cache-Control": `public, max-age=${maxAgeSeconds}, stale-while-revalidate=${staleWhileRevalidateSeconds}`,
    },
  });
}
