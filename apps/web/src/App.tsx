import { trpc } from './lib/trpc'
import {Button} from './components/ui/button'

import { useAuthStore } from './stores/auth.store'

function App() {

  const authState = useAuthStore()
  const loginMutation = trpc.authRouter.login.useMutation()
  const meQuery = trpc.authRouter.me.useQuery(undefined, { enabled: false })

  const healthResponse = trpc.healthRouter.health.useQuery(undefined, {enabled: false})
  const regionsResponse = trpc.regionsRouter.findAll.useQuery(undefined, {enabled: false})
  const invalidCityInput = trpc.citiesRouter.findByRegion.useQuery({ regionId: 'not-a-uuid' }, { enabled: false })
  const missingRegionCities = trpc.citiesRouter.findByRegion.useQuery({ regionId: 'c9aa1258-1a2a-4fac-8c9d-1fa368a10c5f' }, { enabled: false })

  function handleClick() {
    healthResponse.refetch()
    regionsResponse.refetch()
    invalidCityInput.refetch()
    missingRegionCities.refetch()
  }

  function handleLogin() {
  loginMutation.mutate(
    { email: 'test-c5@example.com', password: '123456' },
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

    return (
    <div className="p-4">


      <Button variant="link" onClick={handleClick}>Click me</Button>
      <Button variant="default" onClick={handleLogin}>Login</Button>

      <p>{JSON.stringify(healthResponse.data, null)}</p>
      <p>{JSON.stringify(regionsResponse.data, null)}</p>
      <p>{JSON.stringify(invalidCityInput.error?.data, null)}</p>
      <p>{JSON.stringify(missingRegionCities.data, null)}</p>
      <p>{JSON.stringify({ token: authState.token, user: authState.user }, null)}</p>
    </div>
  )
}
export default App