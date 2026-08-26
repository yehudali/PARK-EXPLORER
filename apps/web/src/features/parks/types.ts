import type { RouterOutput } from '@/lib/trpc'

// A park is whatever the list procedure returns, one element of it. Naming it
// here means no component restates the server's shape by hand.
export type Park = RouterOutput['parksRouter']['findAll'][number]

export type ParkDetail = RouterOutput['parksRouter']['findById']
