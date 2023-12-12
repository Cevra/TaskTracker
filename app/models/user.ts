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

  public static Create({ id, email, name }: CreateUserProps) {
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

  public toJson(): Record<string, string | Record<string, string> | undefined> {
    const record: Record<string, string | Record<string, string> | undefined> =
      {
        id: this.id,
        email: this.email,
        name: this.name,
      };

    if (this.company) {
      record.company = this.company.toJson();
    }

    if (this.worker) {
      record.worker = this.worker.toJson();
    }

    return record;
  }
}
