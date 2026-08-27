import { getRouteApi } from '@tanstack/react-router'

const route = getRouteApi('/_authenticated/')

// Both panes read and write the same piece of the address (E6), so selecting is
// defined once here rather than twice. In particular the replace: without it,
// ten marker clicks cost ten presses of the back button to leave the screen.
export function useParkSelection() {
  const { selected } = route.useSearch()
  const navigate = route.useNavigate()

  function select(id: string | undefined) {
    navigate({ search: (prev) => ({ ...prev, selected: id }), replace: true })
  }

  return { selectedId: selected, select }
}
