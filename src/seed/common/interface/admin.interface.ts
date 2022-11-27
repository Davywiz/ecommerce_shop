import { UserType } from "@prisma/client";

export interface AdminInterface {

    email: string;
    username: string;
    password: string;
    type: UserType;
}

export const Admin: AdminInterface = {

    email: "admin@mail.com",
    username: "admin",
    password: "adminadmin",
    type: UserType.ADMIN,
}

