export enum Route {
  explore = 'explore',
  routines = 'routines',
  runner = 'runner',
}

export interface RouteConfig {
  icon: string;
  route: string;
  name: string;
  requiresActiveRunner: boolean;
}

export const RouteItem: { [key in Route]: RouteConfig } = {
  explore: {
    icon: 'explore',
    route: '/',
    name: 'navigation.explore',
    requiresActiveRunner: false,
  },
  routines: {
    icon: 'format_list_bulleted',
    route: '/',
    name: 'navigation.myRoutines',
    requiresActiveRunner: false,
  },
  runner: {
    icon: 'sports',
    route: '/runner',
    name: 'navigation.runner',
    requiresActiveRunner: true,
  },
};

export const RouteItems: RouteConfig[] = Object.values(RouteItem);
