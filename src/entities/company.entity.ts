export interface CreateCompanyEntity {
    id: number;
    name: string;
    image?: string;
    number_of_product: number;
    number_of_user: number;
    percentage: number;
    user_id: string;
    created_at: Date;
    updated_at?: Date;
    deleted_at?: Date;
};
