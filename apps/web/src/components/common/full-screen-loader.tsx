import { LoaderCircle } from 'lucide-react'

// Shown while the stored token is being checked against the server. It exists
// so that a refresh never flashes the sign-in screen at a signed-in user.
export function FullScreenLoader() {
  return (
    <div className="flex min-h-svh items-center justify-center bg-background">
      <LoaderCircle
        className="size-6 animate-spin text-muted-foreground motion-reduce:animate-none"
        aria-label="Loading"
      />
    </div>
  )
}
