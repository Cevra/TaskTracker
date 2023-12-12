import { EMAIL_REGEX } from '@/constants';
import { ValidationError } from '@/errors/validation-error';
import { CreateUserProps } from 'types';
import { Worker } from './worker';
import { Company } from './company';

export class User {
  company?: Company;
  worker?: Worker;

  private constructor(
    readonly id: string,
    readonly email: string,
    readonly name: string,
  ) {}

  static Create({ id, email, name }: CreateUserProps) {
    if (!EMAIL_REGEX.test(email)) {
      throw new ValidationError('Invalid email');
    }

    return new User(id, email, name);
  }

  public addCompanyDetails(payload: Company) {
    this.company = payload;
  }

  public addWorkerDetails(payload: Worker) {
    this.worker = payload;
  }
}
