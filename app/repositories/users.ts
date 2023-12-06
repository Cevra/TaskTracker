import { doc, updateDoc, setDoc } from "firebase/firestore";
import { CreateUserProps, UpdateUserProps } from "types";
import { User } from "@/models/user";
import { db } from "firebaseConfig";

class Users {
    readonly #collectionName = 'users';

    add(body: CreateUserProps) {
        const user = User.Create(body);
        const userRef = doc(db, this.#collectionName, user.id);
        return setDoc(userRef, user);
    }

    update(userId: string, body: UpdateUserProps) {
        const userRef = doc(db,this.#collectionName,  userId);

        return updateDoc(userRef, body);
    }
}

export const UserRepository = new Users();