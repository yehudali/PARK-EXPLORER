import { trpc } from './lib/trpc'
import {Button} from './components/ui/button'
import { useAuth } from './hooks/useAuth'

function App() {

  const { token, user, login, logout } = useAuth()

  const healthResponse = trpc.healthRouter.health.useQuery(undefined, {enabled: false})
  const regionsResponse = trpc.regionsRouter.findAll.useQuery(undefined, {enabled: false})
  const invalidCityInput = trpc.citiesRouter.findByRegion.useQuery({ regionId: 'not-a-uuid' }, { enabled: false })
  const missingRegionCities = trpc.citiesRouter.findByRegion.useQuery({ regionId: 'c9aa1258-1a2a-4fac-8c9d-1fa368a10c5f' }, { enabled: false })
  const parksResponse = trpc.parksRouter.findAll.useQuery(undefined, { enabled: false })
  const parkByIdResponse = trpc.parksRouter.findById.useQuery({ id: 'e1a57ea0-06de-4b99-aa82-741482f025d6' }, { enabled: false })

  function handleClick() {
    healthResponse.refetch()
    regionsResponse.refetch()
    invalidCityInput.refetch()
    missingRegionCities.refetch()
    parksResponse.refetch()
    parkByIdResponse.refetch()
  }

  function handleLogin() {
    login('test-c5@example.com', '123456')
  }

    return (
    <div className="p-4">


      <Button variant="link" onClick={handleClick}>Click me</Button>
      <Button variant="default" onClick={handleLogin}>Login</Button>
      <Button variant="destructive" onClick={logout}>Logout</Button>

      <p>{JSON.stringify(healthResponse.data, null)}</p>
      <p>{JSON.stringify(regionsResponse.data, null)}</p>
      <p>{JSON.stringify(invalidCityInput.error?.data, null)}</p>
      <p>{JSON.stringify(missingRegionCities.data, null)}</p>
      <p>{JSON.stringify(parksResponse.data, null)}</p>
      <p>{JSON.stringify(parkByIdResponse.data, null)}</p>
      <p>{JSON.stringify({ token, user }, null)}</p>
    </div>
  )
}
export default App