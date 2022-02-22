import App from './App';
import Env from './utils/env.util';
import Log from './utils/log.helper';

async function main(): Promise<void> {
  const app = await App.init({
    log: true,
  });
  const port = Env.get<string>('PORT') ?? 3000;

  app.listen(port, () => {
    Log.info(`Server is running on port: ${port}`);
  });
}

main();
