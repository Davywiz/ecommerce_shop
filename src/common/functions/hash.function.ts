import * as bcrypt from 'bcrypt';

export const hashData = (password: string) => {
    return bcrypt.hash(password, 10);
}
