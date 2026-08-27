import { Link } from '@tanstack/react-router'
import { TreePine } from 'lucide-react'
import { UserMenu } from '@/features/auth/components/user-menu'
import { NewParkButton } from '@/features/parks/components/new-park-button'
import { ThemeToggle } from './theme-toggle'

// At phone width there is not room for the wordmark, the button label and the
// user's name all at once, so each drops its text and keeps its icon. Without
// this the bar pushes the whole page wider than the screen.
export function TopBar() {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between gap-2 border-b bg-card px-4 sm:px-6">
      <Link to="/" className="flex shrink-0 items-center gap-2">
        <span className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-primary">
          <TreePine className="size-4 text-primary-foreground" />
        </span>
        <span className="hidden text-sm font-semibold tracking-tight sm:inline">
          Park Explorer
        </span>
      </Link>

      <div className="flex min-w-0 items-center gap-2">
        <NewParkButton />
        <div className="hidden h-6 w-px bg-border sm:block" />
        <ThemeToggle />
        <UserMenu />
      </div>
    </header>
  )
}
