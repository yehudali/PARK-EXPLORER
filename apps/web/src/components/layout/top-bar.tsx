import { Link } from '@tanstack/react-router'
import { TreePine } from 'lucide-react'
import { UserMenu } from '@/features/auth/components/user-menu'
import { NewParkButton } from '@/features/parks/components/new-park-button'
import { ThemeToggle } from './theme-toggle'

export function TopBar() {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b bg-card px-6">
      <Link to="/" className="flex items-center gap-2">
        <span className="flex size-6 items-center justify-center rounded-lg bg-primary">
          <TreePine className="size-4 text-primary-foreground" />
        </span>
        <span className="text-sm font-semibold tracking-tight">Park Explorer</span>
      </Link>

      <div className="flex items-center gap-2">
        <NewParkButton />
        <div className="h-6 w-px bg-border" />
        <ThemeToggle />
        <UserMenu />
      </div>
    </header>
  )
}
