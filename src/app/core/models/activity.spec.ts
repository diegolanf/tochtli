import { Duration } from 'luxon';

import { ActivityDto, convertDtoTOActivity } from './activity';

const MockActivityDto: ActivityDto = {
  name: 'Activity 1',
  description: 'Description',
  duration: 30,
  customBreakDuration: 20,
};

describe('convertDtoTOActivity', () => {
  it('should return an activity containing name', () => {
    expect(convertDtoTOActivity(MockActivityDto).name).toEqual(MockActivityDto.name);
  });
  it('should return an activity containing description', () => {
    expect(convertDtoTOActivity(MockActivityDto).description).toEqual(MockActivityDto.description);
  });

  it('should convert duration value to 30 seconds Duration', () => {
    expect(convertDtoTOActivity(MockActivityDto).duration).toBeInstanceOf(Duration);
    expect(convertDtoTOActivity(MockActivityDto).duration.as('seconds')).toEqual(30);
  });

  it('should convert custom duration value to 20 seconds Duration', () => {
    expect(convertDtoTOActivity(MockActivityDto).customBreakDuration).toBeInstanceOf(Duration);
    expect(convertDtoTOActivity(MockActivityDto).customBreakDuration?.as('seconds')).toEqual(20);
  });
});
