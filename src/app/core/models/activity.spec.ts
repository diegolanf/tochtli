import { Duration } from 'luxon';

import { ActivityDto, convertDtoToActivity } from './activity';

const MockActivityDto: ActivityDto = {
  name: 'Activity 1',
  description: 'Description',
  duration: 30,
  customBreakDuration: 20,
};

describe('convertDtoToActivity', () => {
  it('should return an activity containing name', () => {
    expect(convertDtoToActivity(MockActivityDto).name).toEqual(MockActivityDto.name);
  });

  it('should return an activity containing description', () => {
    expect(convertDtoToActivity(MockActivityDto).description).toEqual(MockActivityDto.description);
  });

  it('should convert duration value to 30 seconds Duration', () => {
    expect(convertDtoToActivity(MockActivityDto).duration).toBeInstanceOf(Duration);
    expect(convertDtoToActivity(MockActivityDto).duration.as('seconds')).toEqual(30);
  });

  it('should convert custom duration value to 20 seconds Duration', () => {
    expect(convertDtoToActivity(MockActivityDto).customBreakDuration).toBeInstanceOf(Duration);
    expect(convertDtoToActivity(MockActivityDto).customBreakDuration?.as('seconds')).toEqual(20);
  });
});
