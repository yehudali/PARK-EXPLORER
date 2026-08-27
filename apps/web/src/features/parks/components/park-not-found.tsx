import { Link } from '@tanstack/react-router'
import { SearchX } from 'lucide-react'
import { StatePanel } from '@/components/common/state-panel'
import { Button } from '@/components/ui/button'

// Both ways of asking for a park that is not there land here: an id that is not
// a valid identifier at all, and a valid one the server does not know.
export function ParkNotFound() {
  return (
    <StatePanel
      icon={SearchX}
      title="Park not found"
      description="This park may have been deleted, or the address may be wrong."
      action={
        <Button variant="outline" render={<Link to="/">Back to parks</Link>} />
      }
    />
  )
}
