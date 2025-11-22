import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import * as React from "react";

import Header from "../components/Header";
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
          <Header />
          {children}
          <TanStackRouterDevtools position="bottom-right" />
        </TRPCProvider>
        <Scripts />
      </body>
    </html>
  );
}
