export interface NavigationMenuItem {
  icon: string;
  link: string;
  name: string;
  requiresActiveRunner: boolean;
}

export const NavigationMenuItems: NavigationMenuItem[] = [
  {
    icon: 'explore',
    link: '/',
    name: 'navigation.explore',
    requiresActiveRunner: false,
  },
  {
    icon: 'format_list_bulleted',
    link: '/',
    name: 'navigation.myRoutines',
    requiresActiveRunner: false,
  },
  {
    icon: 'sports',
    link: '/runner',
    name: 'navigation.runner',
    requiresActiveRunner: true,
  },
];
