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
      type: payload.type,
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
