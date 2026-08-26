import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { httpBatchLink } from "@trpc/client";
import { trpc } from "./lib/trpc";
import { router } from "./lib/router.ts";
import { createQueryClient } from "./lib/query-client.ts";
import { useAuthStore } from "./stores/auth.store.ts";

const TRPC_URL = "http://localhost:3000/trpc";

export default function Root() {
  const [queryClient] = useState(createQueryClient);
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: TRPC_URL,
          headers: () => {
            const token = useAuthStore.getState().token;
            return token ? { Authorization: `Bearer ${token}` } : {};
          },
        }),
      ],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </trpc.Provider>
  );
}
