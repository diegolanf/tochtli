/* eslint-disable @typescript-eslint/typedef */
import { Route } from '@angular/router';

export const ROUTINE_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./list/routine-list.component').then((mod) => mod.RoutineListComponent),
  },
  {
    path: 'runner',
    loadComponent: () => import('./runner/runner.component').then((mod) => mod.RunnerComponent),
  },
];
