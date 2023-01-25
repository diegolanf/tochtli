/* eslint-disable @typescript-eslint/typedef */
import { Route } from '@angular/router';
import { RoutineService } from '@app/routine/routine.service';

export const ROUTINE_ROUTES: Route[] = [
  {
    path: '',
    pathMatch: 'prefix',
    providers: [RoutineService],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./list/routine-list.component').then((mod) => mod.RoutineListComponent),
      },
      {
        path: 'runner',
        loadComponent: () => import('./runner/runner.component').then((mod) => mod.RunnerComponent),
      },
    ],
  },
];
