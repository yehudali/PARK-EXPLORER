import type { ReactNode } from 'react'
import { TriangleAlert } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { messageFor, type ErrorOverrides } from '@/lib/errors'
import { StatePanel } from './state-panel'

// Only the parts of a query result this needs, so a tRPC query, a plain React
// Query result or a test double all fit.
type QueryLike<TData> = {
  data: TData | undefined
  isPending: boolean
  isError: boolean
  error: unknown
  refetch: () => unknown
}

// The single wrapper D18 asks for. Every screen hands it a query, the shape to
// show while it loads, and what "empty" means for it - and gets the same
// loading, error and empty behaviour as every other screen.
export function QueryState<TData>({
  query,
  skeleton,
  empty,
  isEmpty,
  errorTitle = 'Could not load this',
  errorOverrides,
  children,
}: {
  query: QueryLike<TData>
  skeleton: ReactNode
  empty: ReactNode
  isEmpty?: (data: TData) => boolean
  errorTitle?: string
  errorOverrides?: ErrorOverrides
  children: (data: TData) => ReactNode
}) {
  if (query.isPending) {
    return <>{skeleton}</>
  }

  if (query.isError) {
    return (
      <StatePanel
        icon={TriangleAlert}
        title={errorTitle}
        description={messageFor(query.error, errorOverrides)}
        action={
          <Button variant="outline" onClick={() => query.refetch()}>
            Try again
          </Button>
        }
      />
    )
  }

  // Pending is already handled, so data is here.
  const data = query.data as TData

  if (isEmpty?.(data)) {
    return <>{empty}</>
  }

  return <>{children(data)}</>
}
