import {
  doc,
  updateDoc,
  setDoc,
  query,
  collection,
  where,
  getDocs,
  getDoc,
} from 'firebase/firestore';
import { User } from '@/models/user';
import { db } from 'firebaseConfig';

class Users {
  readonly #collectionName = 'users';

  add(user: User) {
    const userRef = doc(db, this.#collectionName, user.id);
    return setDoc(userRef, user.toJson());
  }

  async getById(userId: string): Promise<User | null> {
    const docRef = doc(db, this.#collectionName, userId);
    const docSnap = await getDoc(docRef);

    return docSnap.exists()
      ? ({ id: docSnap.id, ...docSnap.data() } as User)
      : null;
  }

  update(user: User) {
    const userRef = doc(db, this.#collectionName, user.id);

    return updateDoc(userRef, user.toJson());
  }

  async getEmployedFor(userId: string): Promise<User[]> {
    const q = query(
      collection(db, this.#collectionName),
      where('worker.employerId', '==', userId),
    );
    const querySnapshot = await getDocs(q);
    const users: User[] = [];

    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() } as User);
    });

    return users;
  }

  async filterBy(params: {
    type?: string;
    excludeUserIds: string[];
  }): Promise<User[]> {
    const takenUserIds = new Set<string>(params.excludeUserIds);

    const q = query(
      collection(db, this.#collectionName),
      where('type', '==', params.type),
    );

    const querySnapshot = await getDocs(q);
    const users: User[] = [];

    querySnapshot.forEach((doc) => {
      if (!takenUserIds.has(doc.id)) {
        users.push({ id: doc.id, ...doc.data() } as User);
      }
    });

    return users;
  }

  async getOtherWorkers(userId: string): Promise<User[]> {
    const q = query(
      collection(db, this.#collectionName),
      where('worker.employerId', '!=', userId),
    );
    const querySnapshot = await getDocs(q);
    const users: User[] = [];

    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() } as User);
    });

    return users;
  }
}

export const UserRepository = new Users();
