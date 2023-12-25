export class Worker {
  public isSetup: boolean = false;
  public yearsOfExperience?: number;
  public experiences?: Record<string, boolean>;
  public english?: string;
  public driverLicense?: boolean;
  public workingWithTools?: boolean;
  public ownsTools?: boolean;
  public ownsVehicle?: boolean;

  constructor(public readonly employerId: string) {}

  toJson(): Record<
    string,
    string | number | boolean | Record<string, boolean> | null
  > {
    return {
      employerId: this.employerId,
      yearsOfExperience: this.yearsOfExperience ?? null,
      experiences: this.experiences ?? null,
      english: this.english ?? null,
      driverLicense: this.driverLicense ?? null,
      workingWithTools: this.workingWithTools ?? null,
      ownsTools: this.ownsTools ?? null,
      ownsVehicle: this.ownsVehicle ?? null,
      isSetup: this.isSetup,
    };
  }
}
