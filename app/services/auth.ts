import type { Auth as FirebaseAuth, UserCredential } from 'firebase/auth';
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updatePassword,
  updateProfile
} from 'firebase/auth';
import { getDatabase, ref, get } from 'firebase/database';
import { auth } from 'firebaseConfig';
import { SignUpProps } from 'types';
import { EMAIL_REGEX } from '@/constants';
import { ValidationError } from '@/errors/validation-error';
import { User } from '@/models/user';
import { UserRepository } from '@/repositories/users';
import { Storage } from './storage';

export class Auth {
  private static _instance: Auth;

  constructor(private readonly firebaseAuth: FirebaseAuth) {}

  static Create(auth: FirebaseAuth): Auth {
    if (!Auth.instance) {
      Auth._instance = new Auth(auth);
    }

    return Auth._instance;
  }

  static get instance(): Auth {
    return this._instance;
  }

  static get currentUser(): User | null {
    const instance = Auth.instance;
    const currentUser = instance.firebaseAuth.currentUser;

    return currentUser
      ? User.Create({
          id: currentUser?.uid || '',
          name: currentUser?.displayName || '',
          email: currentUser?.email || '',
        })
      : null;
  }

  public async user(): Promise<User | null> {
    const currentUser = Auth.instance.firebaseAuth.currentUser;
    const user = await Storage.instance.get(`details:${currentUser?.uid}`);

    return user ? (JSON.parse(user) as User) : null;
  }

  async updateUser(updatedUser: User): Promise<void> {
    const currentUser = this.firebaseAuth.currentUser;
  
    if (currentUser) {
      // Update the Firebase Authentication User's display name
      updateProfile(currentUser, {
        displayName: updatedUser.name,
      });
  
      // Update the user in the database
      await Promise.all([
        UserRepository.update(updatedUser),
        Storage.instance.set(`details:${currentUser.uid}`, JSON.stringify(updatedUser)),
      ]);
    } else {
      throw new Error('User not authenticated');
    }
  }

  async getUserNames(): Promise<string[]> {
    try {
      const db = getDatabase();
      const usersRef = ref(db, 'users');
      const snapshot = await get(usersRef);

      const userNames: string[] = [];
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          const userData = childSnapshot.val();
          userNames.push(userData.name);
        });
      }

      return userNames;
    } catch (error) {
      console.error('Error fetching user names:', error);
      throw error;
    }
  }

  public start(): Promise<void> {
    return this.firebaseAuth.authStateReady();
  }

  async signUp(payload: SignUpProps): Promise<User> {
    this.validate(payload);
    const userCredentials: UserCredential =
      await createUserWithEmailAndPassword(
        this.firebaseAuth,
        payload.email,
        payload.password,
      );

    const user = User.Create({
      id: userCredentials.user.uid,
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      type: payload.type,
    });

    return user;
  }

  public signOut(): Promise<void> {
    return this.firebaseAuth.signOut();
  }

  async signIn(email: string, password: string) {
    const creds = await signInWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password,
    );

    const firebaseUser = await UserRepository.getById(creds.user.uid);

    await Storage.instance.set(
      `details:${creds.user.uid}`,
      JSON.stringify(firebaseUser),
    );

    return creds;
  }

  sendResetPasswordEmail(email: string) {
    return sendPasswordResetEmail(this.firebaseAuth, email);
  }

  updatePassword(password: string) {
    return updatePassword(this.firebaseAuth.currentUser!, password);
  }

  private validate({
    confirmPassword,
    password,
    email,
    type,
  }: SignUpProps): void | never {
    if (password?.length < 6) {
      throw new ValidationError('Password must be at least 6 characters long');
    }

    if (password !== confirmPassword) {
      throw new ValidationError('Passwords do not match');
    }

    if (!EMAIL_REGEX.test(email)) {
      throw new ValidationError('Invalid email');
    }

    if (type !== 'company' && type !== 'worker') {
      throw new ValidationError('Invalid user type');
    }
  }
}

export default Auth.Create(auth);
