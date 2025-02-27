import * as db from './db';

interface CreateUserArgs {
    username: string;
    email: string;
    password: string;
    age: number;
    city: string;
}

export const createUser = async (username: string, email: string, password: string, age: number, city: string): Promise<any> => {

    const emailCheck = await db.query(
        `SELECT id FROM users WHERE email = $1`,
        [email]
    );

    if (emailCheck.rows.length > 0) {
        throw new Error('Email already exists');
    }

    const upper = /[A-Z]/.test(password);
    const num = /\d/.test(password);
    const specialChar = /[^a-zA-Z0-9]/.test(password);

    if (!upper || !num || !specialChar) {
        throw new Error('Password does not meet the required criteria.');
    }

    console.log(`Inserting user with username: ${username}, ${email}, ${password}, ${age}, ${city}`);

    const result = await db.query(
        `INSERT INTO users (username, email, password, age, city) VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
        [username, email, password, age, city]
    );
    const user = result.rows[0];

    return user; 
};
