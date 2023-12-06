import { EMAIL_REGEX } from "@/constants";
import { ValidationError } from "@/errors/validation-error";
import { CreateUserProps } from "types";

export class User {
    private constructor(
        readonly id: string, 
        readonly email: string, 
        readonly name: string
    ) {}

    static Create({ id, email, password, name }: CreateUserProps) {
        if (password?.length < 6) {
            throw new ValidationError('Password must be at least 6 characters long');
        }

        if (!EMAIL_REGEX.test(email)) {
            throw new ValidationError('Invalid email');
        }

        return new User(id, email, name);
    }
}

