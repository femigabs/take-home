export const createCompany = `
    INSERT INTO company (
        name,
        number_of_product,
        number_of_user,
        percentage,
        user_id
    )
    VALUES ($1, $2, $3, $4, $5) RETURNING *
`;

export const updateCompany = `
    UPDATE company
    SET 
        name = $1,
        number_of_product = $2,
        number_of_user = $3,
        percentage = $4,
        updated_at = NOW()
    WHERE id = $5 AND user_id = $6 RETURNING *
`;

export const updateCompanyLogo = `
    UPDATE company
    SET 
        image = $1
    WHERE id = $2 RETURNING *
`;

export const getCompanyById = `
        SELECT 
            * 
        FROM company
        WHERE id = $1
    `;

export const getCompanyByUserId = `
    SELECT 
        company.*,
        JSON_BUILD_OBJECT(
            'uid', users.uid,
            'first_name', users.first_name,
            'last_name', users.last_name,
            'email', users.email
        ) AS user
    FROM company
    LEFT JOIN users ON users.uid = company.user_id
    WHERE user_id = $1
`;

export const getAllCompany = `
    SELECT 
        company.*,
        JSON_BUILD_OBJECT(
            'uid', users.uid,
            'first_name', users.first_name,
            'last_name', users.last_name,
            'email', users.email
        ) AS user
    FROM company
    LEFT JOIN users ON users.uid = company.user_id
`;


