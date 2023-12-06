class User {
    private id: number;
    private name: string;
    private email: string;
    private password: string;

    private constructor() {

    }

    static Create({id, email, password, name}: User) {

    } 

    private validatePassword(password: string): void | never {
        if 
        if (password?.length < 6) {
            throw new 
        }
    }

}