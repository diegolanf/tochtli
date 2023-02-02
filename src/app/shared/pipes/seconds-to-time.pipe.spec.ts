import { SecondsToTimePipe } from './seconds-to-time.pipe';

describe('SecondsToTimePipe', () => {
  const secondsToTimePipe = new SecondsToTimePipe();

  it('should return empty string if seconds is undefined', () => {
    expect(secondsToTimePipe.transform(undefined)).toEqual('');
  });

  it('should return empty string if seconds is null', () => {
    expect(secondsToTimePipe.transform(null)).toEqual('');
  });

  it('should convert 1 to "00:01"', () => {
    expect(secondsToTimePipe.transform(1)).toEqual('00:01');
  });

  it('should convert 60 to "01:00"', () => {
    expect(secondsToTimePipe.transform(60)).toEqual('01:00');
  });

  it('should convert 3600 to "01:00:00"', () => {
    expect(secondsToTimePipe.transform(3600)).toEqual('01:00:00');
  });
});
