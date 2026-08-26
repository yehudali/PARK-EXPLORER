import { useQueryClient } from '@tanstack/react-query'
import { trpc } from '../lib/trpc'
import { useAuthStore } from '../stores/auth.store'

export function useAuth() {
  const authState = useAuthStore()
  const queryClient = useQueryClient()
  const loginMutation = trpc.authRouter.login.useMutation()
  const meQuery = trpc.authRouter.me.useQuery(undefined, { enabled: false })

  function login(email: string, password: string) {
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: (data) => {
          useAuthStore.getState().setToken(data.token)
          meQuery.refetch().then((result) => {
            if (result.data) {
              useAuthStore.getState().setUser(result.data)
            }
          })
        },
      },
    )
  }

  function logout() {
    useAuthStore.getState().logout()
    queryClient.clear()
  }

  return {
    token: authState.token,
    user: authState.user,
    login,
    logout,
  }
}
