import { App } from './App'

async function main (): Promise<void> {
  const app = await App.init()
  const port = process.env.PORT ?? 3000

  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
  })
}

void main()
