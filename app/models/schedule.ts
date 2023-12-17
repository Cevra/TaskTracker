import { ScheduleLocation, ScheduleMember } from 'types';

export class Schedule {
  public readonly id?: string;

  constructor(
    public readonly createdById: string,
    public readonly scheduledAt: Date,
    public readonly location: ScheduleLocation,
    public readonly workers: ScheduleMember[],
  ) {}

  public toJson(): Record<
    string,
    string | ScheduleLocation | Date | ScheduleMember[] | undefined
  > {
    return {
      createdById: this.createdById,
      scheduledAt: this.scheduledAt,
      location: {
        id: this.location.id,
        address: this.location.address,
      },
      workers: this.workers.map((w) => ({
        id: w.id,
        name: w.name,
      })),
    };
  }
}
