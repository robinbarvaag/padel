import { createFileRoute } from "@tanstack/react-router"
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { createAPIFileRoute } from "@tanstack/react-start-api-routes";
import { appRouter } from "@/server/trpc/router";

export const Route = createAPIFileRoute("/api/trpc/$")({
  GET: ({ request }: { request: Request }) => {
    return fetchRequestHandler({
      endpoint: "/api/trpc",
      req: request,
      router: appRouter,
      createContext: () => ({}),
    });
  },
  POST: ({ request }: { request: Request }) => {
    return fetchRequestHandler({
      endpoint: "/api/trpc",
      req: request,
      router: appRouter,
      createContext: () => ({}),
    });
  },
});
