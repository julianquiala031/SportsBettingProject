import { date } from 'zod';
import * as db from './db';
import {NBAGameData, NBAGame, NFLGameData, NFLGame, MLBGameData} from './types';

  
  
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
      id: game.id,
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
          `INSERT INTO nflgames (sport, home_team, away_team) VALUES ($1, $2, $3) RETURNING *;`,
          [game.sport, game.home_team, game.away_team]
      );
      
      const gameID: number = gameRes.rows[0].id; 

      await db.query(
        `INSERT INTO nfl_scores (nflgame_id, team_type, q1, q2, q3, q4, overtime, total) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
        [gameID, 'home', game.scores.home.quarter_1, game.scores.home.quarter_2, 
          game.scores.home.quarter_3, game.scores.home.quarter_4, 
          game.scores.home.overtime, game.scores.home.total]
      );

      await db.query(
        `INSERT INTO nfl_scores (nflgame_id, team_type, q1, q2, q3, q4, overtime, total) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
        [gameID, 'away', game.scores.away.quarter_1, game.scores.away.quarter_2, 
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
    `INSERT INTO mlbgames (sport, league, home_team, away_team, date, status, 
    home_errors, away_errors) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id;`,
    [game.sport, game.league, game.home_team, game.away_team, game.date, game.status, game.errors.home, game.errors.away]
  );

  const gameID = gameRes.rows[0].id;

  await db.query(
    `INSERT INTO mlb_scores (mlbgame_id, team_type, hits, errors, in1, in2, in3, in4, in5, 
    in6, in7, in8, in9, extra, total) VALUES ($1, $2, $3, $4, $5, $6, $7, 
    $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *;`,
    [gameID, 'home', game.scores.home.hits, game.scores.home.errors, 
      game.scores.home.innings.inning_1, game.scores.home.innings.inning_2, 
      game.scores.home.innings.inning_3, game.scores.home.innings.inning_4, 
      game.scores.home.innings.inning_5, game.scores.home.innings.inning_6, 
      game.scores.home.innings.inning_7, game.scores.home.innings.inning_8, 
      game.scores.home.innings.inning_9, game.scores.home.innings.extra, game.scores.home.total]
  );

  await db.query(
    `INSERT INTO mlb_scores (mlbgame_id, team_type, hits, errors, in1, in2, in3, in4, in5, 
    in6, in7, in8, in9, extra, total) VALUES ($1, $2, $3, $4, $5, $6, $7, 
    $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *;`,
    [gameID, 'away', game.scores.away.hits, game.scores.away.errors, 
      game.scores.away.innings.inning_1, game.scores.away.innings.inning_2, 
      game.scores.away.innings.inning_3, game.scores.away.innings.inning_4, 
      game.scores.away.innings.inning_5, game.scores.away.innings.inning_6, 
      game.scores.away.innings.inning_7, game.scores.away.innings.inning_8, 
      game.scores.away.innings.inning_9, game.scores.away.innings.extra, game.scores.away.total]
  );



}
}

export const viewNBAGame = async (): Promise<any> => {
  const today = new Date();
  console.log("Game Service hit for viewNBAGame.");
  await db.query(
  `SELECT * FROM nbagames WHERE starttime = $1;`, 
  [today] 
  );
}