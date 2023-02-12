export type AuthDto = {
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export type signInDto = {
    email: string;
    password: string;
}