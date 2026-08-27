import { createFileRoute, notFound } from '@tanstack/react-router'
import { z } from 'zod'
import { ParkDetailScreen } from '@/features/parks/components/park-detail-screen'
import { ParkNotFound } from '@/features/parks/components/park-not-found'

// Anything in the address arrives as a string, however much it looks like an
// id. Checking the shape here means a pasted typo never becomes a request.
const paramsSchema = z.object({ id: z.uuid() })

export const Route = createFileRoute('/_authenticated/parks/$id')({
  beforeLoad: ({ params }) => {
    if (!paramsSchema.safeParse(params).success) {
      throw notFound()
    }
  },
  notFoundComponent: ParkNotFound,
  component: ParkDetailScreen,
})
