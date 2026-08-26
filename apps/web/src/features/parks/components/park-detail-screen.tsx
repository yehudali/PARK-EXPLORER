import { getRouteApi } from '@tanstack/react-router'
import { QueryState } from '@/components/common/query-state'
import { useSession } from '@/features/auth/hooks/useAuth'
import { errorCodeOf } from '@/lib/errors'
import { usePark } from '../hooks/usePark'
import { ParkDetail } from './park-detail'
import { ParkDetailSkeleton } from './park-detail-skeleton'
import { ParkNotFound } from './park-not-found'

const route = getRouteApi('/_authenticated/parks/$id')

export function ParkDetailScreen() {
  const { id } = route.useParams()
  const park = usePark(id)
  const session = useSession()

  // A well formed id that matches nothing is not a failure to show an error
  // about - it is a page that does not exist, and it reads as one.
  if (park.isError && errorCodeOf(park.error) === 'NOT_FOUND') {
    return <ParkNotFound />
  }

  return (
    <QueryState
      query={park}
      skeleton={<ParkDetailSkeleton />}
      errorTitle="Could not load this park"
      empty={null}
    >
      {(data) => (
        <ParkDetail park={data} isOwner={data.creatorId === session.data?.id} />
      )}
    </QueryState>
  )
}
