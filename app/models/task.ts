export class Task {
  public id!: string;
  public clockedIn?: Date;
  public clockedOut?: Date;
  public hours: number = 0;

  constructor(
    public readonly workerId: string,
    readonly place: string,
    readonly scheduleId: string,
  ) {}

  toJson(): Record<string, string | Date | number | null> {
    return {
      workerId: this.workerId,
      place: this.place,
      scheduleId: this.scheduleId,
      hours: this.hours,
      clockedIn: this.clockedIn ?? null,
      clockedOut: this.clockedOut ?? null,
    };
  }
}
