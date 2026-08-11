import { trpc } from './lib/trpc'
import {Button} from './components/ui/button'
function App() {

  const healthResponse = trpc.health.useQuery(undefined, {enabled: false})

  function handleClick() {
    healthResponse.refetch()
  }

  return (
    <div className="p-4">

      <Button variant="link" onClick={handleClick}>Click me</Button>

      <p>{JSON.stringify(healthResponse.data, null)}</p>

    </div>
  )
}
export default App