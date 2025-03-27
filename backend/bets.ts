import express, { Request, Response, NextFunction } from 'express';
import { placeBet } from './betController';

const router = express.Router(); 

router.post(
    '/',
    (req: Request,res: Response, next: NextFunction) =>{
        console.log('Place bets route hit.');
        next();
    },
    placeBet
);

export default router; 