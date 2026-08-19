import { trpc } from './lib/trpc'
import {Button} from './components/ui/button'
function App() {

  const healthResponse = trpc.healthRouter.health.useQuery(undefined, {enabled: false})
  const regionsResponse = trpc.regionsRouter.findAll.useQuery(undefined, {enabled: false})

  function handleClick() {
    healthResponse.refetch()
    regionsResponse.refetch()
  }

  return (
    <div className="p-4">

      <Button variant="link" onClick={handleClick}>Click me</Button>

      <p>{JSON.stringify(healthResponse.data, null)}</p>
      <p>{JSON.stringify(regionsResponse.data, null)}</p>

    </div>
  )
}
export default App