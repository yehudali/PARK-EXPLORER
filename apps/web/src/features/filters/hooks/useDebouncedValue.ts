import { useEffect, useState } from 'react'

// The search box holds every keystroke; this is what the query is allowed to
// see. Without it every letter typed becomes a request.
export function useDebouncedValue<T>(value: T, delayMs = 300) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delayMs)
    return () => clearTimeout(timer)
  }, [value, delayMs])

  return debounced
}
