export class Company {
  constructor(
    readonly name: string,
    readonly id: string,
    readonly address: string,
  ) {}

  toJson(): Record<string, string> {
    return {
      name: this.name, 
      id: this.id,
      address: this.address,
    };
  }
}
