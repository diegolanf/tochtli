/* eslint-disable @typescript-eslint/typedef */
import { Route } from '@angular/router';

export const ROUTES: Route[] = [
  { path: '', loadChildren: () => import('./routine/routes').then((mod) => mod.ROUTINE_ROUTES) },
];
