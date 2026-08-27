import { createRouter } from '@tanstack/react-router'
import { routeTree } from '../routeTree.gen'

export const router = createRouter({ routeTree })

// Tells the router's types which router instance this app uses, so every
// navigate and every route param is checked against the real route tree.
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
