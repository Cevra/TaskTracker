import { Location } from '@/models/location';
import {
  addDoc,
  collection,
  query,
  where,
  onSnapshot,
  Unsubscribe,
  orderBy,
  doc,
  deleteDoc,
  getDocs,
} from 'firebase/firestore';

import { db } from 'firebaseConfig';

class Locations {
  readonly #collectionName = 'locations';

  add(location: Location) {
    return addDoc(collection(db, this.#collectionName), location.toJson());
  }

  async getAll(): Promise<Location[]> {
    const q = query(collection(db, this.#collectionName));
    const locations: Location[] = [];

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      locations.push({ id: doc.id, ...doc.data() } as Location);
    });

    return locations;
  }

  async getForUser(userId: string): Promise<Location[]> {
    const q = query(
      collection(db, this.#collectionName),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
    );
    const locations: Location[] = [];

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      locations.push({ id: doc.id, ...doc.data() } as Location);
    });

    return locations;
  }

  remove(id: string): Promise<void> {
    return deleteDoc(doc(db, this.#collectionName, id));
  }

  listenForUser(
    userId: string,
    onData: (entities: Location[]) => void,
  ): Unsubscribe {
    const q = query(
      collection(db, this.#collectionName),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
    );

    return onSnapshot(q, (querySnapshot) => {
      const locations: Location[] = [];

      querySnapshot.forEach((doc) => {
        locations.push({ id: doc.id, ...doc.data() } as Location);
      });

      onData(locations);
    });
  }
}

export const LocationRepository = new Locations();
