export interface CreateUserEntity {
    id?: number;
    first_name: string;
    last_name: string;
    uid: string;
    email: string;
    is_admin?: boolean;
    password: string;
    created_at: Date;
    updated_at?: Date;
    deleted_at?: Date
};

export interface LoginUserEntity {
    uid: string;
    first_name: string;
    last_name: string;
    email: string;
    is_admin?: boolean;
    token: string;
    disabled: boolean;
    created_at?: Date;
};

export interface VerifiedUserEntity {
    uid: string;
};