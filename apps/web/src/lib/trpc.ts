import { createTRPCReact } from '@trpc/react-query';
import type { inferRouterOutputs } from '@trpc/server';
import type { AppRouter } from '@server/@generated/server';

export const trpc = createTRPCReact<AppRouter>();

// What every procedure returns, read off the generated router. Features name
// their own types from this instead of restating the server's shapes.
export type RouterOutput = inferRouterOutputs<AppRouter>;