import { router, publicProcedure } from './trpc';

export const appRouter = router({
  health: publicProcedure.query(() => {
    return { status: 'ok', message: 'Hello 1!!' };
  }),
});

export type AppRouter = typeof appRouter;
