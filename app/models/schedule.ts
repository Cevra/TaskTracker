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
    const location = {
      id: this.location.id,
      city: this.location.city,
      country: this.location.country,
      address: this.location.address,
    };

    return {
      createdById: this.createdById,
      company: this.company,
      scheduledAt: this.scheduledAt,
      location,
      workers: this.workers.map((w) => ({
        id: w.id,
        name: w.name,
        note: w.note,
        color: w.color,
        email: w.email,
        location,
      })),
      workerIds: this.workerIds,
    };
  }
}
