import { Suspense, lazy } from 'react'
import { Outlet } from '@tanstack/react-router'
import { AppShell } from './app-shell'

// Both devtools are dev dependencies, and both are pulled in lazily so the
// production bundle never carries them.
const RouterDevtools = import.meta.env.PROD
  ? () => null
  : lazy(() =>
      import('@tanstack/react-router-devtools').then((m) => ({
        default: m.TanStackRouterDevtools,
      })),
    )

const QueryDevtools = import.meta.env.PROD
  ? () => null
  : lazy(() =>
      import('@tanstack/react-query-devtools').then((m) => ({
        default: m.ReactQueryDevtools,
      })),
    )

export function RootLayout() {
  return (
    <>
      <AppShell>
        <Outlet />
      </AppShell>
      <Suspense fallback={null}>
        <RouterDevtools position="bottom-right" />
        <QueryDevtools initialIsOpen={false} />
      </Suspense>
    </>
  )
}
