import type { Auth as FirebaseAuth, UserCredential } from 'firebase/auth';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from 'firebaseConfig';
import { SignUpProps } from 'types';
import { EMAIL_REGEX } from '@/constants';
import { ValidationError } from '@/errors/validation-error';
import { User } from '@/models/user';

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

  static get currentUser(): User {
    return User.Create({
      id: auth.currentUser?.uid || '',
      name: auth.currentUser?.displayName || '',
      email: auth.currentUser?.email || '',
    });
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
    });

    return user;
  }

  signIn(email: string, password: string) {
    return signInWithEmailAndPassword(this.firebaseAuth, email, password);
  }

  private validate({
    confirmPassword,
    password,
    email,
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
  }
}

export default Auth.Create(auth);
