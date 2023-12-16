import { Address } from 'types';

export class Location {
  public readonly id?: string;
  public readonly userId: string;
  public readonly address: string;
  public readonly placeId: string;
  public readonly createdAt: Date;
  public readonly city?: string;
  public readonly country?: string;
  public readonly streetName?: string;
  public readonly streetNumber?: string;
  public readonly zip?: string;
  public readonly latitude?: number;
  public readonly longitude?: number;

  constructor(userId: string, address: Address) {
    this.userId = userId;
    this.address = address.address;
    this.placeId = address.placeId;
    this.city = address.city;
    this.country = address.country;
    this.streetName = address.streetName;
    this.streetNumber = address.streetNumber;
    this.zip = address.zip;
    this.latitude = address.latitude;
    this.longitude = address.longitude;
    this.createdAt = new Date();
  }

  public toJson(): Record<string, string | null | number> {
    return {
      userId: this.userId,
      address: this.address,
      placeId: this.placeId,
      createdAt: this.createdAt.toISOString(),
      city: this.city ?? null,
      country: this.country ?? null,
      streetName: this.streetName ?? null,
      streetNumber: this.streetNumber ?? null,
      zip: this.zip ?? null,
      latitude: this.latitude ?? null,
      longitude: this.longitude ?? null,
    };
  }
}
