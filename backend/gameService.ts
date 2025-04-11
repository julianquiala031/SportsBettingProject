import { date } from 'zod';
import * as db from './db';
import {Request, Response} from 'express';
import {NBAGameData, NBAGame, NFLGameData, NFLGame, MLBGameData, LineScore, Odds, nflOdds, mlbOdds, nflScores, mlbScores, MLBGame} from './types';
import { error } from 'console';

  
  
export const getNBAGame = async(data: NBAGameData[]): Promise<any> => {

    const games: NBAGame[] = data.map(game => ({
        id: game.id,
        sport: "Basketball", // Since we are fetching only basketball data
        league: game.league,
        home_team: game.teams.home.name,
        away_team: game.teams.visitors.name,
        startTime: game.date.start,
        status: game.status.long,
        home_points: game.scores.home.points,
        away_points: game.scores.visitors.points,
        home_wins: game.scores.home.win,
        home_losses: game.scores.home.loss,
        away_wins: game.scores.visitors.win,
        away_losses: game.scores.visitors.loss,
        homeline: {
          q1: Number(game.scores.home.linescore[0]) || 0,
          q2: Number(game.scores.home.linescore[1]) || 0,
          q3: Number(game.scores.home.linescore[2]) || 0,
          q4: Number(game.scores.home.linescore[3]) || 0,
        },
        awayline: {
          q1: Number(game.scores.visitors.linescore[0]) || 0,
          q2: Number(game.scores.visitors.linescore[1]) || 0,
          q3: Number(game.scores.visitors.linescore[2]) || 0,
          q4: Number(game.scores.visitors.linescore[3]) || 0,
        }

    }));


    for (const game of games) {
      try {  
        /*


        let firstUpdate: boolean = true; 
        if(firstUpdate === true){
        const gameRes = await db.query(
            `INSERT INTO nbagames (sport, league, home_team, away_team, startTime, status, 
            home_points, away_points, home_wins, home_losses, 
            away_wins, away_losses) VALUES ($1, $2, $3, $4, 
            $5, $6, $7, $8, $9, $10, $11, $12) RETURNING id;`,
            [game.sport, game.league, game.home_team, 
              game.away_team, game.startTime, game.status,
             game.home_points, game.away_points, game.home_wins, game.home_losses,
            game.away_wins, game.away_losses] 
        );
     
    

        const gameID: number = gameRes.rows[0].id;

        await db.query(
          `INSERT INTO nba_linescores (nbagame_id, team_type, quarter1, quarter2, 
          quarter3, quarter4) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`,
          [gameID, 'home', game.homeline.q1, game.homeline.q2, game.homeline.q3, 
            game.homeline.q4]
        );

        await db.query(
          `INSERT INTO nba_linescores (nbagame_id, team_type, quarter1, quarter2, 
          quarter3, quarter4) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`,
          [gameID, 'away', game.awayline.q1, game.awayline.q2, game.awayline.q3, 
            game.awayline.q4]
        );
        firstUpdate = false;

      }else{
      */
        const gameRes = await db.query(
            `INSERT INTO nbagames (gameID, sport, league, home_team, away_team, startTime, status, 
            home_points, away_points, home_wins, home_losses, 
            away_wins, away_losses) VALUES ($1, $2, $3, $4, 
            $5, $6, $7, $8, $9, $10, $11, $12, $13) ON CONFLICT (gameid)
            DO UPDATE SET 
              league = EXCLUDED.league,
              home_team = EXCLUDED.home_team,
              away_team = EXCLUDED.away_team,
              startTime = EXCLUDED.startTime,
              status = EXCLUDED.status,
              home_points = EXCLUDED.home_points,
              away_points = EXCLUDED.away_points,
              home_wins = EXCLUDED.home_wins,
              home_losses = EXCLUDED.home_losses,
              away_wins = EXCLUDED.away_wins,
              away_losses = EXCLUDED.away_losses,
              updated_at = CURRENT_TIMESTAMP
              RETURNING ID;`,
            [game.id, game.sport, game.league, game.home_team, 
              game.away_team, game.startTime, game.status,
             game.home_points, game.away_points, game.home_wins, game.home_losses,
            game.away_wins, game.away_losses] 
        );

        const gameID: number = gameRes.rows[0].id;

        await db.query(
          `INSERT INTO nba_linescores (gameID, nbagame_id, team_type, quarter1, quarter2, 
          quarter3, quarter4) VALUES ($1, $2, $3, $4, $5, $6, $7)
          ON CONFLICT (gameID, team_type) 
          DO UPDATE SET
          quarter1 = EXCLUDED.quarter1,
          quarter2 = EXCLUDED.quarter2,
          quarter3 = EXCLUDED.quarter3,
          quarter4 = EXCLUDED.quarter4,
          updated_at = CURRENT_TIMESTAMP
          RETURNING *;`,
          [game.id, gameID, 'home', game.homeline.q1, game.homeline.q2, game.homeline.q3, 
            game.homeline.q4]
        );

        await db.query(
          `INSERT INTO nba_linescores (gameID, nbagame_id, team_type, quarter1, quarter2, 
          quarter3, quarter4) VALUES ($1, $2, $3, $4, $5, $6, $7)
          ON CONFLICT (gameID, team_type) 
          DO UPDATE SET
          quarter1 = EXCLUDED.quarter1,
          quarter2 = EXCLUDED.quarter2,
          quarter3 = EXCLUDED.quarter3,
          quarter4 = EXCLUDED.quarter4,
          updated_at = CURRENT_TIMESTAMP
          RETURNING *;`,
          [game.id, gameID, 'away', game.awayline.q1, game.awayline.q2, game.awayline.q3, 
            game.awayline.q4]
        );


     // }
/*
        await db.query(
          `INSERT INTO odds (home_odds, away_odds) VALUES ($1, $2) RETURNING *;`,
          [game.odds?.moneyline?.home, game.odds?.moneyline?.away]
        );
    }
    */

  } catch(error) { 
    console.log('There was an error inserting into DB: ', error); 
  }
}  
}

export const getNFLGame = async(data: NFLGameData[]): Promise<any> => {

  const games: NFLGame[] = data.map(game => ({
      id: game.game.id,
      sport: "Football", // Since we are fetching only football data
      home_team: game.teams.home.name,
      away_team: game.teams.away.name,
      scores: {
        home: {
          quarter_1: game.scores?.home.quarter_1,
          quarter_2: game.scores?.home.quarter_2,
          quarter_3: game.scores?.home.quarter_3,
          quarter_4: game.scores?.home.quarter_4,
          overtime: game.scores?.home.overtime,
          total: game.scores?.home.total
        },
        away: {
          quarter_1: game.scores?.away.quarter_1,
          quarter_2: game.scores?.away.quarter_2,
          quarter_3: game.scores?.away.quarter_3,
          quarter_4: game.scores?.away.quarter_4,
          overtime: game.scores?.away.overtime,
          total: game.scores?.away.total, 
        }
    }
  }));

  for (const game of games) {

      const gameRes = await db.query(
          `INSERT INTO nflgames (gameID, sport, home_team, away_team) VALUES ($1, $2, $3, $4) 
          ON CONFLICT (gameID) DO UPDATE SET
          home_team = EXCLUDED.home_team,
          away_team = EXCLUDED.away_team,
          updated_at = CURRENT_TIMESTAMP
          RETURNING *;`,
          [game.id, game.sport, game.home_team, game.away_team]
      );
      
      const nflgame_id: number = gameRes.rows[0].id; 

      await db.query(
        `INSERT INTO nfl_scores (gameID, nflgame_id, team_type, q1, q2, q3, q4, overtime, total) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
        ON CONFLICT (gameID) DO UPDATE SET
        q1 = EXCLUDED.q1,
        q2 = EXCLUDED.q2,
        q3 = EXCLUDED.q3,
        q4 = EXCLUDED.q4,
        updated_at = CURRENT_TIMESTAMP
        RETURNING *`,
        [game.id, nflgame_id, 'home', game.scores.home.quarter_1, game.scores.home.quarter_2, 
          game.scores.home.quarter_3, game.scores.home.quarter_4, 
          game.scores.home.overtime, game.scores.home.total]
      );

      await db.query(
        `INSERT INTO nfl_scores (gameID, nflgame_id, team_type, q1, q2, q3, q4, overtime, total) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
        ON CONFLICT (gameID) DO UPDATE SET
        q1 = EXCLUDED.q1,
        q2 = EXCLUDED.q2,
        q3 = EXCLUDED.q3,
        q4 = EXCLUDED.q4,
        updated_at = CURRENT_TIMESTAMP
        RETURNING *`,
        [game.id, nflgame_id, 'away', game.scores.away.quarter_1, game.scores.away.quarter_2, 
          game.scores.away.quarter_3, game.scores.away.quarter_4, 
          game.scores.away.overtime, game.scores.away.total]
      );
/*
      await db.query(
        `INSERT INTO odds (home_odds, away_odds) VALUES ($1, $2) RETURNING *;`,   
        [game.odds?.moneyline?.home, game.odds?.moneyline?.away]
      );
      */
  }
  

}  

export const getMLBGame = async (data: MLBGameData[]): Promise<any> =>{

  const games = data.map(game => ({
    id: game.id,
    sport: 'Baseball',
    league: game.league.name,
    home_team: game.teams.home.name,
    away_team: game.teams.away.name,
    date: game.date,
    status: game.status.long,
    scores: {
      home: {
        hits: game.scores.home.hits,
        errors: game.scores.away.hits,
        innings: {
          inning_1: isNaN(Number(game.scores.home.innings[1])) ? 0 : Number(game.scores.home.innings[1]),
          inning_2: isNaN(Number(game.scores.home.innings[2])) ? 0 : Number(game.scores.home.innings[2]),
          inning_3: isNaN(Number(game.scores.home.innings[3])) ? 0 : Number(game.scores.home.innings[3]),
          inning_4: isNaN(Number(game.scores.home.innings[4])) ? 0 : Number(game.scores.home.innings[4]),
          inning_5: isNaN(Number(game.scores.home.innings[5])) ? 0 : Number(game.scores.home.innings[5]),
          inning_6: isNaN(Number(game.scores.home.innings[6])) ? 0 : Number(game.scores.home.innings[6]),
          inning_7: isNaN(Number(game.scores.home.innings[7])) ? 0 : Number(game.scores.home.innings[7]),
          inning_8: isNaN(Number(game.scores.home.innings[8])) ? 0 : Number(game.scores.home.innings[8]),
          inning_9: isNaN(Number(game.scores.home.innings[9])) ? 0 : Number(game.scores.home.innings[9]),
          extra: isNaN(Number(game.scores.home.innings.extra)) ? 0 : Number(game.scores.home.innings.extra)
        },
        total: game.scores.home.total,
      },
      away: {
        hits: game.scores.away.hits,
        errors: game.scores.away.errors,
        innings: {
          inning_1: isNaN(Number(game.scores.away.innings[1])) ? 0 : Number(game.scores.away.innings[1]),
          inning_2: isNaN(Number(game.scores.away.innings[2])) ? 0 : Number(game.scores.away.innings[2]),
          inning_3: isNaN(Number(game.scores.away.innings[3])) ? 0 : Number(game.scores.away.innings[3]),
          inning_4: isNaN(Number(game.scores.away.innings[4])) ? 0 : Number(game.scores.away.innings[4]),
          inning_5: isNaN(Number(game.scores.away.innings[5])) ? 0 : Number(game.scores.away.innings[5]),
          inning_6: isNaN(Number(game.scores.away.innings[6])) ? 0 : Number(game.scores.away.innings[6]),
          inning_7: isNaN(Number(game.scores.away.innings[7])) ? 0 : Number(game.scores.away.innings[7]),
          inning_8: isNaN(Number(game.scores.away.innings[8])) ? 0 : Number(game.scores.away.innings[8]),
          inning_9: isNaN(Number(game.scores.away.innings[9])) ? 0 : Number(game.scores.away.innings[9]),
          extra: isNaN(Number(game.scores.away.innings.extra)) ? 0 : Number(game.scores.away.innings.extra)
        },
        total:  game.scores.away.total,
      }
  },
  errors: {
      home: game.scores.home.errors,
      away: game.scores.away.errors,
  }


  
}));

for (const game of games){

  //console.log('in1', game.scores.home.innings.inning_1);
  const gameRes = await db.query(
    `INSERT INTO mlbgames (gameID, sport, league, home_team, away_team, date, status, 
    home_errors, away_errors) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
    ON CONFLICT (gameID) DO UPDATE SET
    date = EXCLUDED.date,
    status = EXCLUDED.status,
    home_errors = EXCLUDED.home_errors,
    away_errors = EXCLUDED.away_errors
    RETURNING id;`,
    [game.id, game.sport, game.league, game.home_team, game.away_team, game.date, game.status, game.errors.home, game.errors.away]
  );

  const mlbgame_ID = gameRes.rows[0].id;

  await db.query(
    `INSERT INTO mlb_scores (gameID, mlbgame_id, team_type, hits, errors, in1, in2, in3, in4, in5, 
    in6, in7, in8, in9, extra, total) VALUES ($1, $2, $3, $4, $5, $6, $7, 
    $8, $9, $10, $11, $12, $13, $14, $15, $16) 
    ON CONFLICT (gameID, team_type) DO UPDATE SET 
    hits = EXCLUDED.hits,
    errors = EXCLUDED.errors, 
    in1 = EXCLUDED.in1,
    in2 = EXCLUDED.in2,
    in3 = EXCLUDED.in3,
    in4 = EXCLUDED.in4,
    in5 = EXCLUDED.in5,
    in6 = EXCLUDED.in6,
    in7 = EXCLUDED.in7,
    in8 = EXCLUDED.in8,
    in9 = EXCLUDED.in9,
    extra = EXCLUDED.extra
    RETURNING *;`,
    [game.id, mlbgame_ID, 'home', game.scores.home.hits, game.scores.home.errors, 
      game.scores.home.innings.inning_1, game.scores.home.innings.inning_2, 
      game.scores.home.innings.inning_3, game.scores.home.innings.inning_4, 
      game.scores.home.innings.inning_5, game.scores.home.innings.inning_6, 
      game.scores.home.innings.inning_7, game.scores.home.innings.inning_8, 
      game.scores.home.innings.inning_9, game.scores.home.innings.extra, game.scores.home.total]
  );

  await db.query(
    `INSERT INTO mlb_scores (gameID, mlbgame_id, team_type, hits, errors, in1, in2, in3, in4, in5, 
    in6, in7, in8, in9, extra, total) VALUES ($1, $2, $3, $4, $5, $6, $7, 
    $8, $9, $10, $11, $12, $13, $14, $15, $16) 
    ON CONFLICT (gameID, team_type) DO UPDATE SET
     hits = EXCLUDED.hits,
    errors = EXCLUDED.errors, 
    in1 = EXCLUDED.in1,
    in2 = EXCLUDED.in2,
    in3 = EXCLUDED.in3,
    in4 = EXCLUDED.in4,
    in5 = EXCLUDED.in5,
    in6 = EXCLUDED.in6,
    in7 = EXCLUDED.in7,
    in8 = EXCLUDED.in8,
    in9 = EXCLUDED.in9,
    extra = EXCLUDED.extra
    RETURNING *;`,
    [game.id, mlbgame_ID, 'away', game.scores.away.hits, game.scores.away.errors, 
      game.scores.away.innings.inning_1, game.scores.away.innings.inning_2, 
      game.scores.away.innings.inning_3, game.scores.away.innings.inning_4, 
      game.scores.away.innings.inning_5, game.scores.away.innings.inning_6, 
      game.scores.away.innings.inning_7, game.scores.away.innings.inning_8, 
      game.scores.away.innings.inning_9, game.scores.away.innings.extra, game.scores.away.total]
  );



}
}

interface nbaQuery { 
  since? : string;
}

export const updateNBAGame = async (req: Request, res: Response): Promise<any> => {
  console.log("Game Service hit for viewNBAGame.");
  const lastFetched = req.query?.since; 

  if (!lastFetched) throw new Error('Missing or invalid since parameter.');

  const gameRes = await db.query(
  `SELECT * FROM nbagames WHERE updated_at > $1 ORDER BY updated_at DESC;`,
  [lastFetched]
  );

  const games= gameRes.rows;

  const gameIDS = games.map(g=> g.id);

  const scoresRes = await db.query(
    `SELECT * FROM nba_linescores WHERE game_id = ANY($1::int[]);`,
    [gameIDS]
  );

  const betsRes = await db.query(
    `SELECT * FROM nbabets WHERE game_id = ANY($1::int[]);`,
    [gameIDS]
  );

  const bets = betsRes.rows;

  const betIDS = bets.map(b=> b.id);

  const betDetails = await db.query(
    `SELECT * FROM nbabet_details WHERE bet_id = ANY($1::int[]);`,
    [betIDS]
  );

  const gamesWithExtras: NBAGame[] = games.map((game: NBAGame) => {
    const gameLines: LineScore[] = scoresRes.rows.filter(
      (ls: LineScore) => ls.nbagame_id === game.id
    );
  
    const homeLine = gameLines.find(ls => ls.team_type === 'home');
    const awayLine = gameLines.find(ls => ls.team_type === 'away');
  
    const odds = betsRes.rows.find((o: Odds) => o.nbagame_id === game.id);
  
    return {
      ...game,
      linescores: {
        home: homeLine,
        away: awayLine
      },
      odds: odds || null
    };
  });


}

export const updateNFlGame = async (req: Request, res: Response): Promise<any>  => {
  console.log('Game service for  updating nfl games hit');
  const lastFetched = req.query?.since;

  if(!lastFetched) throw new Error('Invalid or missing since parameter.');

  const gameRes = await db.query(
    `SELECT * FROM nflgames WHERE updated_at > $1 ORDER BY updated_at DESC;`,
    [lastFetched]
  );

  const games= gameRes.rows;

  const gameIDS = games.map(g=> g.id);

  const scoresRes = await db.query(
    `SELECT * FROM nfl_scores WHERE game_id = ANY($1::int[]);`,
    [gameIDS]
  );

  const betsRes = await db.query(
    `SELECT * FROM nflbets WHERE game_id = ANY($1::int[]);`,
    [gameIDS]
  );

  const bets = betsRes.rows;

  const betIDS = bets.map(b=> b.id);

  const betDetails = await db.query(
    `SELECT * FROM nflbet_details WHERE bet_id = ANY($1::int[]);`,
    [betIDS]
  );

  const gamesWithExtras: NFLGame[] = games.map((game: NFLGame) => {
    const gameScores: nflScores[] = scoresRes.rows.filter(
      (ls: nflScores) => ls.nflgame_id === game.id
    );
  
    const homeScores = gameScores.find(ls => ls.team_type === 'home');
    const awayScores = gameScores.find(ls => ls.team_type === 'away');
  
    const odds = betsRes.rows.find((o: nflOdds) => o.nflgame_id === game.id);
  
    if (!homeScores || !awayScores) {
      throw new Error(`Scores missing for game ID: ${game.id}`);
    }
  
    const formatScore = (s: nflScores) => ({
      quarter_1: s.quarter_1,
      quarter_2: s.quarter_2,
      quarter_3: s.quarter_3,
      quarter_4: s.quarter_4,
      overtime: s.overtime,
      total: s.total,
    });
  
    return {
      ...game,
      scores: {
        home: formatScore(homeScores),
        away: formatScore(awayScores),
      },
      odds: odds?.bookmakers ? { bookmakers: odds.bookmakers } : undefined,
    };
  });
}

export const updateMLBGame = async (req: Request, res: Response): Promise<any> =>{
  console.log('Game service for updating MLB Games hit.');
  const lastFetched = req.query?.since;

  if(!lastFetched) throw new Error('Invalid or missing since parameter.');

  const gameRes = await db.query(
    `SELECT * FROM mlbgames WHERE updated_at $1 ORDER BY updated_at DESC;`,
    [lastFetched]
  );

  const games= gameRes.rows;

  const gameIDS = games.map(g=> g.id);

  const scoresRes = await db.query(
    `SELECT * FROM mlb_scores WHERE game_id = ANY($1::int[]);`,
    [gameIDS]
  );

  const betsRes = await db.query(
    `SELECT * FROM mlbbets WHERE game_id = ANY($1::int[]);`,
    [gameIDS]
  );

  const bets = betsRes.rows;

  const betIDS = bets.map(b=> b.id);

  const betDetails = await db.query(
    `SELECT * FROM mlbbet_details WHERE bet_id = ANY($1::int[]);`,
    [betIDS]
  );

  const gamesWithExtras: MLBGame[] = games.map((game: MLBGame) => {
    const gameScores = scoresRes.rows.filter(
      (ls: mlbScores) => ls.mlbgame_id === game.id
    );
  
    const homeScores = gameScores.find(ls => ls.team_type === 'home');
    const awayScores = gameScores.find(ls => ls.team_type === 'away');
  
    const odds = betsRes.rows.find((o: mlbOdds) => o.mlbgame_id === game.id);
  
    return {
      ...game,
      scores: {
        home: homeScores,
        away: awayScores
      },
      odds: odds || null
    };
  });


}

//setInterval(getNBAGame, 30000);
//setInterval(getNFLGame, 30000);
//setInterval(getMLBGame, 30000);
