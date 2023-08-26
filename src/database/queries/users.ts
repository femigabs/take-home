export const createUser = `
        INSERT INTO users (
            first_name,
            last_name,
            email,
            uid
        ) 
        VALUES ($1, $2, $3, $4) RETURNING *
    `;
export const getUserByEmail = `
        SELECT 
            * 
        FROM users
        WHERE email = $1
    `;
export const getUserByFirebaseUId = `
        SELECT 
            * 
        FROM users
        WHERE uid = $1
    `;
