import { createFileRoute, redirect } from '@tanstack/react-router'
import { AuthenticatedLayout } from '@/components/layout/authenticated-layout'
import { useAuthStore } from '@/stores/auth.store'

// A pathless layout route: it adds no segment to any address, it only wraps
// everything filed under it. This one wrapper is the whole of D12.
export const Route = createFileRoute('/_authenticated')({
  // No token at all is answered without asking the server anything.
  beforeLoad: ({ location }) => {
    if (useAuthStore.getState().token === null) {
      throw redirect({ to: '/login', search: { redirect: location.href } })
    }
  },
  component: AuthenticatedLayout,
})
