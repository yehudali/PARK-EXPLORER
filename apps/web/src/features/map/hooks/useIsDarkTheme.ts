import { useEffect, useState } from 'react'

// The theme is a class on the html element, written by applyTheme. Reading it
// back from there keeps a single source of truth: the toggle owns the value,
// and this only watches what the toggle wrote. A second copy of the state in a
// context or a store would be a second thing that can disagree.
export function useIsDarkTheme() {
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains('dark'),
  )

  useEffect(() => {
    const root = document.documentElement
    const observer = new MutationObserver(() => {
      setIsDark(root.classList.contains('dark'))
    })

    observer.observe(root, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  return isDark
}
