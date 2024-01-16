import { ScheduleLocation, ScheduleMember } from 'types';

export class Schedule {
  public readonly id?: string;

  constructor(
    public readonly createdById: string,
    public readonly company: string,
    public readonly scheduledAt: string,
    public readonly location: ScheduleLocation,
    public readonly workers: ScheduleMember[],
    public readonly workerIds: string[],
  ) {}

  public toJson(): Record<
    string,
    string | string[] | ScheduleLocation | Date | ScheduleMember[] | undefined
  > {
    return {
      createdById: this.createdById,
      company: this.company,
      scheduledAt: this.scheduledAt,
      location: {
        id: this.location.id,
        city: this.location.city,
        country: this.location.country,
        address: this.location.address,
      },
      workers: this.workers.map((w) => ({
        id: w.id,
        name: w.name,
        note: w.note,
      })),
      workerIds: this.workerIds,
    };
  }
}
