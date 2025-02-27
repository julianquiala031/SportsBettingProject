import { Request, Response } from 'express';
import * as userService from './userService';

export const createUser = async (req: Request, res: Response): Promise<void> => {
    console.log('POST received to make a new user.');
    
    try {
        const { username, email, password, age, city }: { username: string; email: string; password: string; age: number; city: string } = req.body;
        const user = await userService.createUser(username, email, password, age, city);
        res.status(201).json(user);
    } catch (error: any) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
};
