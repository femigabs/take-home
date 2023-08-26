export class CreateCompanyDto {
    name: string;
    image?: string;
    number_of_product: number;
    number_of_user: number;
    user_id: string;
    is_admin: boolean;
};

export class UpdateCompanyDto {
    name: string;
    number_of_product: number;
    number_of_user: number;
    user_id: string;
    id: number;
    is_admin?: boolean;
};

export class UpdateCompanyLogoObjectDto {
    url: string;
    id: number;
};


export class UpdateCompanyLogoDto {
    images: UpdateCompanyLogoObjectDto[];
    is_admin: boolean
};
