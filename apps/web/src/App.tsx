import { trpc } from './lib/trpc'
import {Button} from './components/ui/button'
function App() {

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

    return (
    <div className="p-4">

      <Button variant="link" onClick={handleClick}>Click me</Button>

      <p>{JSON.stringify(healthResponse.data, null)}</p>
      <p>{JSON.stringify(regionsResponse.data, null)}</p>
      <p>{JSON.stringify(invalidCityInput.error?.data, null)}</p>
      <p>{JSON.stringify(missingRegionCities.data, null)}</p>
    </div>
  )
}
export default App