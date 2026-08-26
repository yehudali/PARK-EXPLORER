import { useState } from 'react'
import { getRouteApi } from '@tanstack/react-router'
import { Pencil, Trash2 } from 'lucide-react'
import { QueryState } from '@/components/common/query-state'
import { Button } from '@/components/ui/button'
import { useSession } from '@/features/auth/hooks/useAuth'
import { errorCodeOf } from '@/lib/errors'
import { usePark } from '../hooks/usePark'
import { DeleteParkDialog } from './delete-park-dialog'
import { ParkDetail } from './park-detail'
import { ParkDetailSkeleton } from './park-detail-skeleton'
import { ParkFormDialog } from './park-form-dialog'
import { ParkNotFound } from './park-not-found'

const route = getRouteApi('/_authenticated/parks/$id')

export function ParkDetailScreen() {
  const { id } = route.useParams()
  const park = usePark(id)
  const session = useSession()

  const [editing, setEditing] = useState(false)
  const [deleting, setDeleting] = useState(false)

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
      {(data) => {
        const isOwner = data.creatorId === session.data?.id

        return (
          <>
            <ParkDetail
              park={data}
              isOwner={isOwner}
              // Only the creator gets them. The server enforces the same rule,
              // so hiding them is courtesy, not security.
              actions={
                isOwner && (
                  <div className="flex shrink-0 items-center gap-2">
                    <Button variant="outline" onClick={() => setEditing(true)}>
                      <Pencil />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => setDeleting(true)}
                    >
                      <Trash2 />
                      Delete
                    </Button>
                  </div>
                )
              }
            />

            <ParkFormDialog
              park={data}
              open={editing}
              onOpenChange={setEditing}
            />
            <DeleteParkDialog
              park={data}
              open={deleting}
              onOpenChange={setDeleting}
            />
          </>
        )
      }}
    </QueryState>
  )
}
