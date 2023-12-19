export class Worker {
  constructor(public readonly employerId: string) {}

  toJson(): Record<string, string> {
    return {
      employerId: this.employerId,
    };
  }
}
