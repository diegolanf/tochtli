import { Routine } from './routine';
import { MockRoutineDto } from './test/routine.mock';

describe('Routine', () => {
  it('should create an instance', () => {
    expect(new Routine(MockRoutineDto)).toBeTruthy();
  });
});
