export class CreateUserDto {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    is_admin: string;
};

export class LoginUserDto {
    email: string;
    password: string;
};