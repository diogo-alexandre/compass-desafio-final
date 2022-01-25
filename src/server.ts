import { App } from './App'
import { Log } from './helpers/log.helper'
import { env } from './utils/env.util'

async function main (): Promise<void> {
  const app = await App.init()
  const port = env('PORT') ?? 3000

  app.listen(port, () => {
    Log.info(`Server is running on port: ${port}`)
  })
}

void main()
