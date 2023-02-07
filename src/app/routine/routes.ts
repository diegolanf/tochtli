/* eslint-disable @typescript-eslint/typedef */
import { Route } from '@angular/router';
import { RouteItem } from '@app/core/constants/route.constants';
import { removeLeadingSlash } from '@app/shared';

export const ROUTINE_ROUTES: Route[] = [
  {
    path: removeLeadingSlash(RouteItem.routines.route),
    loadComponent: () =>
      import('./list/routine-list.component').then((mod) => mod.RoutineListComponent),
  },
  {
    path: removeLeadingSlash(RouteItem.runner.route),
    loadComponent: () => import('./runner/runner.component').then((mod) => mod.RunnerComponent),
  },
];
