import express, {Request, Response, NextFunction} from 'express';
import {getNBAGame, getNFLGame, getMLBGame, viewNBAGame} from './gameController'; 

const router = express.Router(); 

router.get(
    '/get-NBA-Game',
    (req: Request, res: Response, next: NextFunction) =>{
        console.log('GET /get-NBA-Game route was hit.');
        next();
    },
    getNBAGame
); 

router.get(
    '/get-NFL-game',
    (req: Request, res: Response, next: NextFunction) => {
        console.log('GET /get-NFL-route was hit');
        next();
    },
    getNFLGame
);

router.get(
    '/get-MLB-game',
    (req: Request, res: Response, next: NextFunction) => {
        console.log('/get-MLB-game route reached');
        next();
    },
    getMLBGame,
);

router.get(
    '/viewNBAgame',
    (req: Request, res: Response, next: NextFunction) => {
        console.log('GET route for viewGames hit.');
        next();
    },
    viewNBAGame
);

export default router; 