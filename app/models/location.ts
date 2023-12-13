import { Address } from 'types';

export class Location {
  private address: string;
  private placeId: string;
  private city?: string;
  private country?: string;
  private streetName?: string;
  private streetNumber?: string;
  private zip?: string;
  private latitude?: number;
  private longitude?: number;

  constructor(address: Address) {
    this.address = address.address;
    this.placeId = address.placeId;
    this.city = address.city;
    this.country = address.country;
    this.streetName = address.streetName;
    this.streetNumber = address.streetNumber;
    this.zip = address.zip;
    this.latitude = address.latitude;
    this.longitude = address.longitude;
  }

  public toJson(): Record<string, string | null | number> {
    return {
      address: this.address,
      placeId: this.placeId,
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
