import { App } from './App'
import { Log } from './utils/log.helper'
import { Env } from './utils/env.util'

async function main (): Promise<void> {
  const app = await App.init()
  const port = Env.get<string>('PORT') ?? 3000

  app.listen(port, () => {
    Log.info(`Server is running on port: ${port}`)
  })
}

void main()
