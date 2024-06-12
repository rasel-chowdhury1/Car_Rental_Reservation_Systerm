import { USER_ROLE } from "../User/User.constrant";

export type TLoginUser = {
    email: string,
    password: string
}

export type TUserRole = keyof typeof USER_ROLE;