import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import cors from 'cors';

import userRoutes from './users';
import authRoutes from './auth';

dotenv.config();

console.log('Loaded Port:', process.env.PORT);

const app = express();
const port: string | undefined = process.env.PORT;

app.get('/', (req: Request, res: Response): void => {
    res.send('Server is running');
});

app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);
app.use('/auth', authRoutes);

app.listen(port, (): void => {
    console.log('Server is running at port: ', port);
});
