import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ParkFormDialog } from './park-form-dialog'

export function NewParkButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)} aria-label="New park">
        <Plus />
        <span className="hidden sm:inline">New park</span>
      </Button>
      <ParkFormDialog open={open} onOpenChange={setOpen} />
    </>
  )
}
