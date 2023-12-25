export class Task {
  public readonly id!: string;
  constructor(
    public readonly workerId: string,
    readonly clockedIn: Date,
    readonly clockedOut: Date,
    readonly place: string,
    readonly hours: number,
  ) {}

  toJson(): Record<string, string | Date | number> {
    return {
      clockedIn: this.clockedIn,
      clockedOut: this.clockedOut,
      place: this.place,
      hours: this.hours,
      workerId: this.workerId,
    };
  }
}
