import { doc, updateDoc, setDoc } from 'firebase/firestore';
import { User } from '@/models/user';
import { db } from 'firebaseConfig';

class Users {
  readonly #collectionName = 'users';

  add(user: User) {
    const userRef = doc(db, this.#collectionName, user.id);
    return setDoc(userRef, user.toJson());
  }

  update(user: User) {
    const userRef = doc(db, this.#collectionName, user.id);

    return updateDoc(userRef, user.toJson());
  }
}

export const UserRepository = new Users();
