import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import * as React from "react";

import { DashboardLayout } from "../components/layout/DashboardLayout";
import { TRPCProvider } from "../lib/trpc";
import "../styles.css";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Padel Tournament Manager",
      },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <TRPCProvider>
          <DashboardLayout>{children}</DashboardLayout>
          <TanStackRouterDevtools position="bottom-right" />
        </TRPCProvider>
        <Scripts />
      </body>
    </html>
  );
}
