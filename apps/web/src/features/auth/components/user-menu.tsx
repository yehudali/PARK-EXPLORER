import { useNavigate } from '@tanstack/react-router'
import { ChevronDown, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Skeleton } from '@/components/ui/skeleton'
import { useLogout, useSession } from '../hooks/useAuth'

function initialsOf(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

export function UserMenu() {
  const session = useSession()
  const logout = useLogout()
  const navigate = useNavigate()

  // No error branch on purpose: the authenticated layout renders this shell
  // only once the identity query has succeeded, so a failed session never
  // reaches here. The skeleton covers the one gap - a refetch in flight.
  if (!session.data) {
    return <Skeleton className="h-7 w-28" />
  }

  const user = session.data

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" className="gap-2 px-2" aria-label={user.name}>
            <span className="flex size-7 shrink-0 items-center justify-center rounded-lg border bg-muted text-xs font-semibold">
              {initialsOf(user.name)}
            </span>
            {/* The name is the first thing to go at phone width. */}
            <span className="hidden max-w-32 truncate sm:inline">{user.name}</span>
            <ChevronDown className="hidden text-muted-foreground sm:block" />
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="w-56">
        {/* The label maps to Base UI's GroupLabel, which throws unless it sits
            inside a group - unlike the Radix component of the same name. */}
        <DropdownMenuGroup>
          <DropdownMenuLabel className="flex flex-col gap-1">
            <span className="font-medium">{user.name}</span>
            <span className="text-xs font-normal text-muted-foreground">
              {user.email}
            </span>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            logout()
            navigate({ to: '/login' })
          }}
        >
          <LogOut />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
