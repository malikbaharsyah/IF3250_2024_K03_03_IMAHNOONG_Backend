export type Admin = {
    id: number;
    username: string;
    password: string;
    isSuperAdmin: boolean;
    imageProfilePath?: string;
    email: string;
}