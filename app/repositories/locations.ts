import { Location } from '@/models/location';
import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
  Unsubscribe,
  orderBy,
  doc,
  deleteDoc,
} from 'firebase/firestore';

import { db } from 'firebaseConfig';

class Locations {
  readonly #collectionName = 'locations';

  add(location: Location) {
    return addDoc(collection(db, this.#collectionName), location.toJson());
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
