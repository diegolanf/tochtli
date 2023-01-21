/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/typedef */
import { INestApplication } from '@nestjs/common';
import * as express from 'express';
import * as functions from 'firebase-functions';

import { nestApp } from './app.init';

const server = express();
let initialized = false;

export const createNestServer = async (expressInstance: any): Promise<INestApplication> => {
  const app: INestApplication = await nestApp(expressInstance);
  return await app.init();
};

export const app = functions.https.onRequest(async (request, response) => {
  if (!initialized) {
    await createNestServer(server);
    initialized = true;
  }
  server(request, response);
});
