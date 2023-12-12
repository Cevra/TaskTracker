export class Company {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly address: string,
  ) {}

  toJson(): Record<string, string> {
    return {
      id: this.id,
      name: this.name,
      address: this.address,
    };
  }
}
