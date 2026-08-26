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

  const createPark = trpc.parksRouter.create.useMutation()
  const updatePark = trpc.parksRouter.update.useMutation()
  const removePark = trpc.parksRouter.remove.useMutation()
  const forbiddenUpdate = trpc.parksRouter.update.useMutation()

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

  // Create, edit and delete in one go, so the whole write path is exercised
  // from the browser and not only from curl.
  async function handleParkWriteCycle() {
    const created = await createPark.mutateAsync({
      name: 'park from the browser',
      cityId: '3fb41e18-c8bc-48a2-9c4f-c65734c8e1db',
      location: { type: 'Point', coordinates: [35.21, 31.77] },
    })

    await updatePark.mutateAsync({ id: created.id, name: 'park from the browser, edited' })
    await removePark.mutateAsync({ id: created.id })

    parksResponse.refetch()
  }

  // A park created by someone else. Should come back as FORBIDDEN.
  function handleForbiddenEdit() {
    forbiddenUpdate.mutate({ id: 'e1a57ea0-06de-4b99-aa82-741482f025d6', name: 'hijacked' })
  }

    return (
    <div className="p-4">


      <Button variant="link" onClick={handleClick}>Click me</Button>
      <Button variant="default" onClick={handleLogin}>Login</Button>
      <Button variant="destructive" onClick={logout}>Logout</Button>
      <Button variant="secondary" onClick={handleParkWriteCycle}>Park write cycle</Button>
      <Button variant="outline" onClick={handleForbiddenEdit}>Edit someone else's park</Button>

      <p>{JSON.stringify(healthResponse.data, null)}</p>
      <p>{JSON.stringify(regionsResponse.data, null)}</p>
      <p>{JSON.stringify(invalidCityInput.error?.data, null)}</p>
      <p>{JSON.stringify(missingRegionCities.data, null)}</p>
      <p>{JSON.stringify(parksResponse.data, null)}</p>
      <p>{JSON.stringify(parkByIdResponse.data, null)}</p>
      <p>{JSON.stringify({ token, user }, null)}</p>
      <p>created: {JSON.stringify(createPark.data, null)}</p>
      <p>edited: {JSON.stringify(updatePark.data, null)}</p>
      <p>deleted: {JSON.stringify(removePark.data, null)}</p>
      <p>forbidden: {JSON.stringify(forbiddenUpdate.error?.data, null)}</p>
    </div>
  )
}
export default App