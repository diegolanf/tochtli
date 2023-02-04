import { RoutineDto } from '@app/core/models/routine';

export const upperBody: RoutineDto = {
  id: '1',
  name: 'Upper body workout',
  globalBreakDuration: 5,
  activities: [
    {
      name: 'Arm walking push-up',
      duration: 30,
    },
    {
      name: 'Plank shoulder touch',
      duration: 30,
    },
    {
      name: 'Push up rotation',
      duration: 30,
    },
    {
      name: 'High plank lift',
      duration: 30,
    },
    {
      name: 'Plank push up',
      duration: 30,
    },
    {
      name: 'Narrow push up',
      duration: 30,
    },
    {
      name: 'Shoulder push up',
      duration: 30,
    },
    {
      name: 'Superman',
      duration: 30,
    },
    {
      name: 'Superman pull down',
      duration: 30,
    },
    {
      name: 'Triceps dips',
      duration: 30,
    },
  ],
};

export const fullBody: RoutineDto = {
  id: '2',
  name: 'Full body workout',
  globalBreakDuration: 5,
  activities: [
    {
      name: 'Jumping jacks',
      duration: 30,
    },
    {
      name: 'Mountain climbers',
      duration: 30,
    },
    {
      name: 'Squat side kick',
      duration: 30,
    },
    {
      name: 'Squat jumps',
      duration: 30,
      customBreakDuration: 60,
    },
    {
      name: 'Push ups',
      duration: 30,
    },
    {
      name: 'Plank push ups',
      duration: 30,
    },
    {
      name: 'Side leg raise (right)',
      duration: 30,
    },
    {
      name: 'Side leg raise (left)',
      duration: 30,
    },
    {
      name: 'T rotation',
      duration: 30,
    },
    {
      name: 'Hip bridge',
      duration: 30,
    },
  ],
};

export const absWorkout: RoutineDto = {
  id: '3',
  name: 'Abs workout',
  globalBreakDuration: 5,
  activities: [
    {
      name: 'Leg raise',
      duration: 30,
    },
    {
      name: 'Leg lift circles',
      duration: 30,
    },
    {
      name: 'Scissor kick',
      duration: 30,
    },
    {
      name: 'Cross crunch',
      duration: 30,
    },
    {
      name: 'Bycicle',
      duration: 45,
      customBreakDuration: 20,
    },
    {
      name: 'Russian twist',
      duration: 40,
    },
    {
      name: 'Side leg raise (right)',
      duration: 20,
    },
    {
      name: 'Side leg raise (left)',
      duration: 20,
    },
    {
      name: 'Plank rotation',
      duration: 35,
    },
    {
      name: 'Plank',
      duration: 40,
    },
  ],
};

export const loseBellyFat: RoutineDto = {
  id: '4',
  name: 'Lose belly fat workout',
  globalBreakDuration: 15,
  activities: [
    {
      name: 'High knee tap',
      duration: 45,
    },
    {
      name: 'Crunch',
      duration: 45,
    },
    {
      name: 'Reverse crunch',
      duration: 45,
    },
    {
      name: 'Seated crunch',
      duration: 45,
    },
    {
      name: 'Leg pull back',
      duration: 45,
    },
    {
      name: 'Leg pull',
      duration: 45,
    },
    {
      name: 'Drop squat',
      duration: 45,
      customBreakDuration: 30,
    },
    {
      name: 'Burpee',
      duration: 45,
      customBreakDuration: 30,
    },
    {
      name: 'Squat in & out',
      duration: 45,
    },
  ],
};

export const MyRoutines: RoutineDto[] = [upperBody, fullBody, absWorkout, loseBellyFat];
