import type { Address, AddressComponent, GoogleMapAddress } from 'types';

export function parseGoogleMapsResponse(
  googleMapAddress: GoogleMapAddress,
): Address {
  const city = googleMapAddress.address_components.find(
    (component: AddressComponent) => component.types.includes('locality'),
  )?.long_name;
  const country = googleMapAddress.address_components.find(
    (component: AddressComponent) => component.types.includes('country'),
  )?.long_name;
  const streetName = googleMapAddress.address_components.find(
    (component: AddressComponent) => component.types.includes('route'),
  )?.long_name;
  const streetNumber = googleMapAddress.address_components.find(
    (component: AddressComponent) => component.types.includes('street_number'),
  )?.long_name;
  const zip = googleMapAddress.address_components.find(
    (component: AddressComponent) => component.types.includes('postal_code'),
  )?.long_name;
  const latitude = googleMapAddress.geometry.location.lat;
  const longitude = googleMapAddress.geometry.location.lng;
  const address = googleMapAddress.formatted_address;
  const placeId = googleMapAddress.place_id;

  return {
    placeId,
    address,
    city,
    country,
    streetName,
    streetNumber,
    latitude,
    longitude,
    zip,
  };
}
