import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { messageFor } from '@/lib/errors'
import { useDeletePark } from '../hooks/useParkMutations'
import type { ParkDetail } from '../types'

// Deleting cannot be undone, so it is the one action that asks first.
export function DeleteParkDialog({
  park,
  open,
  onOpenChange,
}: {
  park: ParkDetail
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const remove = useDeletePark()
  const navigate = useNavigate()

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this park?</AlertDialogTitle>
          <AlertDialogDescription>
            {park.name} will be removed for everyone. This cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={remove.isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            disabled={remove.isPending}
            onClick={() =>
              remove.mutate(
                { id: park.id },
                {
                  onSuccess: () => {
                    toast.success('Park deleted.')
                    // The screen we are on no longer has anything to show.
                    void navigate({ to: '/' })
                  },
                  onError: (error) => toast.error(messageFor(error)),
                },
              )
            }
          >
            {remove.isPending ? 'Deleting…' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
