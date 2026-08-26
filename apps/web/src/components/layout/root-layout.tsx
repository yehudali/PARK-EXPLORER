import { Suspense, lazy } from 'react'
import { Outlet } from '@tanstack/react-router'

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
      {/* No shell here on purpose: the sign-in and register screens are
          full-page cards, and only the authenticated layout adds the top bar. */}
      <Outlet />
      <Suspense fallback={null}>
        <RouterDevtools position="bottom-right" />
        <QueryDevtools initialIsOpen={false} />
      </Suspense>
    </>
  )
}
