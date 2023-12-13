import { Location } from '@/models/location';
import { addDoc, collection } from 'firebase/firestore';
import { db } from 'firebaseConfig';

class Locations {
  readonly #collectionName = 'locations';

  add(location: Location) {
    return addDoc(collection(db, this.#collectionName), location.toJson());
  }
}

export const LocationRepository = new Locations();
