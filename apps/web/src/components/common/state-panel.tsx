import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

// One shape for every "there is nothing to show" panel: an icon, a title, one
// sentence, and at most one thing to do about it. Errors and both empty states
// all render through this, which is what keeps them looking like one product.
export function StatePanel({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: LucideIcon
  title: string
  description: string
  action?: ReactNode
}) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
      <Icon className="size-8 text-muted-foreground/50" />
      <span className="text-base font-semibold tracking-tight">{title}</span>
      <span className="max-w-xs text-sm leading-relaxed text-muted-foreground text-pretty">
        {description}
      </span>
      {action}
    </div>
  )
}
