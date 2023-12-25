import { EMAIL_REGEX } from '@/constants';
import { ValidationError } from '@/errors/validation-error';
import { CreateUserProps } from 'types';
import { Worker } from './worker';
import { Company } from './company';

export class User {
  company?: Company;
  worker?: Worker;
  address?: string;

  private constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly name: string,
    public readonly phone?: string,
    public readonly type?: 'company' | 'worker',
  ) {}

  public static Create({ id, email, name, phone, type }: CreateUserProps) {
    if (!EMAIL_REGEX.test(email)) {
      throw new ValidationError('Invalid email');
    }

    return new User(id, email, name, phone, type);
  }

  public addCompanyDetails(payload: Company) {
    this.company = payload;
  }

  public addWorkerDetails(payload: Worker) {
    this.worker = payload;
  }

  public toJson(): Record<
    string,
    string | Record<string, string> | Partial<Worker> | undefined
  > {
    const record: Record<
      string,
      string | Record<string, string> | Partial<Worker> | undefined
    > = {};

    if (this.id) {
      record.id = this.id;
    }

    if (this.email) {
      record.email = this.email;
    }

    if (this.name) {
      record.name = this.name;
    }

    if (this.type) {
      record.type = this.type;
    }

    if (this.company) {
      record.company = this.company.toJson();
    }

    if (this.worker) {
      record.worker = this.worker.toJson();
    }

    return record;
  }
}
