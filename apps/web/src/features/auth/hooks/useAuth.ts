import { useQueryClient } from '@tanstack/react-query'
import { trpc } from '@/lib/trpc'
import { useAuthStore } from '@/stores/auth.store'

// The signed-in user, as a query rather than a copy in the store. It only runs
// once there is a token, and it is the single check that the token is still
// good - if it fails, the global handler signs the user out.
export function useSession() {
  const token = useAuthStore((state) => state.token)

  return trpc.authRouter.me.useQuery(undefined, {
    enabled: token !== null,
    staleTime: Infinity,
  })
}

// Nothing is invalidated on the way in. Storing the token flips the identity
// query from disabled to enabled, and enabling it is what fetches it.
export function useLogin() {
  const setToken = useAuthStore((state) => state.setToken)

  return trpc.authRouter.login.useMutation({
    onSuccess: (data) => setToken(data.token),
  })
}

// Registering returns a token exactly like signing in does, which is what lets
// a new account land straight on the main screen.
export function useRegister() {
  const setToken = useAuthStore((state) => state.setToken)

  return trpc.authRouter.register.useMutation({
    onSuccess: (data) => setToken(data.token),
  })
}

export function useLogout() {
  const queryClient = useQueryClient()
  const clear = useAuthStore((state) => state.clear)

  // Drop the token first, then the cache - otherwise a query can refetch with
  // the old token in the split second between the two.
  return function logout() {
    clear()
    queryClient.clear()
  }
}
