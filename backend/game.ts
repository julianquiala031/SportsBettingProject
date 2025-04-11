import express, {Request, Response, NextFunction} from 'express';
import {getNBAGame, getNFLGame, getMLBGame, updateNBAGame, updateNFLGame, updateMLBGame} from './gameController'; 

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
    '/updateNBAgame',
    (req: Request, res: Response, next: NextFunction) => {
        console.log('GET route for updateNBAGames hit.');
        next();
    },
    updateNBAGame
);

router.get(
    '/updateNFLgame',
    (req: Request, res: Response, next: NextFunction) => {
        console.log('Hit updateNFL route.');
        next();
    },
    updateNFLGame
);

router.get(
    '/updateMLBgame',
    (req: Request, res: Response, next: NextFunction) => {
        console.log('GET route for updateMlb Games hit.');
        next();
    },
    updateMLBGame
);

export default router; 