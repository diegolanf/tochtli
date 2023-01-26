import { Duration } from 'luxon';

export interface ActivityDto {
  name: string;
  description?: string;
  duration: number;
  customBreakDuration?: number;
}

export interface Activity {
  name: string;
  description?: string;
  duration: Duration;
  customBreakDuration?: Duration;
}

export const convertDtoTOActivity = (dto: ActivityDto): Activity => ({
  name: dto.name,
  description: dto.description,
  duration: Duration.fromObject({ seconds: dto.duration }),
  customBreakDuration: dto.customBreakDuration
    ? Duration.fromObject({ seconds: dto.customBreakDuration })
    : undefined,
});
