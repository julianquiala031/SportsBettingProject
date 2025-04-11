import express, {Request, Response} from 'express';
import * as betService from './betService';


export const placeBet = async(req: Request, res: Response): Promise<any> => {

    try{
        const {user_id, game_id, gameID, bet_type, bet_side, amount, odds } = req.body;
         if(!user_id ||  !game_id || !gameID || ! bet_type || !bet_side || !amount || !odds){ 
            res.status(400).json({error: "Missing fields."}); 
         }

         const bet = req.body; 

         await betService.placeBet(user_id, game_id, gameID, bet_type, bet_side, amount, odds); 
         res.status(200).json({message: "Bet placement successful!"}); 
         return bet; 
    }catch(error){
        console.error("Error placing bet: ", error);
        res.status(500).json({error: "Internal server error"});
    }



}
