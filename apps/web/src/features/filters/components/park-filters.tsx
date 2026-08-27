import { useEffect, useRef, useState } from 'react'
import { getRouteApi } from '@tanstack/react-router'
import { Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useCities } from '../hooks/useCities'
import { useDebouncedValue } from '../hooks/useDebouncedValue'
import { useRegions } from '../hooks/useRegions'

const route = getRouteApi('/_authenticated/')

// A stand-in for "no choice", because the select always holds a value and an
// empty string is not one.
const ANY = 'any'

export function ParkFilters() {
  const filters = route.useSearch()
  const navigate = route.useNavigate()

  // Two values on purpose: this one follows every keystroke...
  const [term, setTerm] = useState(filters.search ?? '')
  // ...and only this one ever reaches the address, and through it the query.
  const debouncedTerm = useDebouncedValue(term)

  const regions = useRegions()
  const cities = useCities(filters.regionId)

  // Remembers what this box last wrote to the address, which is how the two
  // effects below tell "I did that" apart from "someone else did that".
  const lastPushed = useRef(filters.search)

  // The box writes to the address.
  useEffect(() => {
    const next = debouncedTerm.trim() || undefined
    if (next === lastPushed.current) return
    lastPushed.current = next
    navigate({ search: (prev) => ({ ...prev, search: next }), replace: true })
  }, [debouncedTerm, navigate])

  // The address writes back to the box - but only when the change came from
  // somewhere else: the back button, or the clear button in the empty state.
  // Without the guard, a fast typist gets their last few letters swallowed.
  useEffect(() => {
    if (filters.search === lastPushed.current) return
    lastPushed.current = filters.search
    setTerm(filters.search ?? '')
  }, [filters.search])

  const regionItems: Record<string, string> = { [ANY]: 'All regions' }
  for (const region of regions.data ?? []) regionItems[region.id] = region.name

  const cityItems: Record<string, string> = { [ANY]: 'All cities' }
  for (const city of cities.data ?? []) cityItems[city.id] = city.name

  const hasFilters = Boolean(filters.search || filters.regionId || filters.cityId)

  return (
    // A two column grid at phone width - search across the top, the two
    // selects side by side - and a plain row once there is space for one.
    <div className="grid grid-cols-2 gap-3 border-b bg-card px-4 py-3 sm:flex sm:flex-wrap sm:items-center sm:px-6">
      <div className="relative col-span-2 sm:col-span-1 sm:w-64">
        <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={term}
          onChange={(event) => setTerm(event.target.value)}
          placeholder="Search parks"
          aria-label="Search parks"
          className="w-full pl-8"
        />
      </div>

      <Select
        items={regionItems}
        value={filters.regionId ?? ANY}
        onValueChange={(value) =>
          navigate({
            search: (prev) => ({
              ...prev,
              regionId: value === ANY ? undefined : String(value),
              // Changing region drops the city: a city from the old region
              // would filter everything away and look like a bug.
              cityId: undefined,
            }),
          })
        }
      >
        <SelectTrigger className="w-full sm:w-44" aria-label="Region">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(regionItems).map(([value, label]) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        items={cityItems}
        value={filters.cityId ?? ANY}
        // Nothing to choose from until a region narrows it down.
        disabled={!filters.regionId}
        onValueChange={(value) =>
          navigate({
            search: (prev) => ({
              ...prev,
              cityId: value === ANY ? undefined : String(value),
            }),
          })
        }
      >
        <SelectTrigger className="w-full sm:w-44" aria-label="City">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(cityItems).map(([value, label]) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {hasFilters && (
        <Button
          variant="ghost"
          onClick={() => {
            setTerm('')
            navigate({ search: {} })
          }}
        >
          <X />
          Clear
        </Button>
      )}
    </div>
  )
}
