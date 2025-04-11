
import pool from './db'; 

interface placeBet {
    user_id: number;
    game_id: number;
    gameID: number;
    bet_type: string;
    bet_side: string;
    amount: number;
    odds: number;
}

export const placeBet = async(user_id: number, game_id: number, gameID: number, bet_type: string, bet_side: string, amount: number, odds: number): Promise<any> => {

    const verifyGame = await pool.query(
        `SELECT * FROM nbagames WHERE id = $1`,
        [game_id]
    );
    if (verifyGame.rowCount === 0){
        throw new Error('This game does not exist.');
    }

    const potentialPayout = (amount * odds).toFixed(2);


    if (verifyGame.rows[0].sport == "Basketball"){   
        await pool.query(
            `INSERT INTO nbabets (user_id, game_id, gameID, bet_type, bet_side, amount, odds, potential_Payout) 
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`,
            [user_id, game_id, gameID, bet_type, bet_side, amount, odds, potentialPayout]
        );
    }

    if (verifyGame.rows[0].sport == "Football"){   
        await pool.query(
            `INSERT INTO nflbets (user_id, game_id, gameID, bet_type, bet_side, amount, odds, potential_Payout) 
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`,
            [user_id, game_id, bet_type, bet_side, amount, odds, potentialPayout]
        );
    }

    if (verifyGame.rows[0].sport == "Baseball"){   
        await pool.query(
            `INSERT INTO mlbbets (user_id, game_id, gameID, bet_type, bet_side, amount, odds, potential_Payout) 
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`,
            [user_id, game_id, bet_type, bet_side, amount, odds, potentialPayout]
        );
    }




}
