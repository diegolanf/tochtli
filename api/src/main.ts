import { INestApplication } from '@nestjs/common';

import { nestApp } from './app.init';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const module: any;

async function bootstrap(): Promise<void> {
  const app: INestApplication = await nestApp();
  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
