import type { ReactNode } from 'react'
import { TreePine } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

// The shell both auth screens sit in. It knows nothing about forms - it is the
// wordmark, the card and the heading, and the screen fills the rest.
export function AuthCard({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: ReactNode
}) {
  return (
    <div className="flex min-h-svh items-center justify-center bg-muted p-6">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex flex-col items-center gap-3">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary">
            <TreePine className="size-5 text-primary-foreground" />
          </span>
          <span className="text-sm font-semibold tracking-tight">
            Park Explorer
          </span>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">{children}</CardContent>
        </Card>
      </div>
    </div>
  )
}
