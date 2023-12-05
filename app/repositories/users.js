import { collection, doc, addDoc, updateDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

class Users{
    #collectionName = 'users';

    add(userId, body) {
        const userRef = doc(db, this.#collectionName, userId);
        return setDoc(userRef, body);
    }

    update(userId,body){
        const userRef = doc(db,this.#collectionName,  userId);

        return updateDoc(userRef,body);
    }
}
export default new Users();


//istrazi
//singleton
//promises
//abstraction
//repository