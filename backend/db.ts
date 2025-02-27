import { Pool, QueryResult } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export const query = async (text: string, params: any[]): Promise<QueryResult<any>> => {
    return pool.query(text, params);
};
