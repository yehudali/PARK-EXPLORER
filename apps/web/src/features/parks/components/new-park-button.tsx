import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ParkFormDialog } from './park-form-dialog'

export function NewParkButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus />
        New park
      </Button>
      <ParkFormDialog open={open} onOpenChange={setOpen} />
    </>
  )
}
