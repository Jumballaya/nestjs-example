export interface User {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    id?: string;
    created: Date;
    updated: Date;
}
