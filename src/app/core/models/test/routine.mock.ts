import { RoutineDto } from '@app/core/models/routine';

export const MockRoutineDto: RoutineDto = {
  id: '1',
  name: 'Routine 1',
  globalBreakDuration: 10,
  activities: [
    {
      name: 'Activity 1',
      duration: 20,
      description: 'Description for activity 1',
    },
    {
      name: 'Activity 2',
      duration: 10,
      customBreakDuration: 5,
      description: 'Description for activity 2',
    },
    {
      name: 'Activity 3',
      duration: 5,
    },
  ],
};

export const MockEmptyRoutineDto: RoutineDto = {
  id: '2',
  name: 'Routine 2',
  globalBreakDuration: 10,
  activities: [],
};
