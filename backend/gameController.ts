import {Request, Response} from 'express';
import * as gameService from './gameService'; 
const fetch = require('node-fetch'); 
import {NBAGameData, NBAApiresponse, NFLGameData, NFLApiResponse, MLBGameData, MLBApiResponse} from './types';
 


export const getNBAGame = async(req: Request, res: Response): Promise<NBAGameData[]> =>{

    try{
        console.log('GET route for getGame hit');
       const league = '12';
       const season = '2023';
       const url = `https://v2.nba.api-sports.io/games?season=${season}`
        const response = await fetch(url,{
            method: "GET",
            headers: {
                'x-rapidapi-key': process.env.API_SPORTS_KEY,
                'x-rapidapi-host': 'https://v2.nba.api-sports.io'
            }as Record<string, string>,
        });
        
        const data: NBAApiresponse = await response.json();
        const games: NBAGameData[] = data.response; 
        await gameService.getNBAGame(games);
        res.status(201).json({message: 'Games have been succesfully fetched and logged in DB', data: data});

        return games; 
        
    }catch(error){
        console.error('Error fetching data: ', error);
        return []; 
    }
  }

    export const getNFLGame = async(req: Request, res: Response): Promise<NFLGameData[]> =>{

      try{
          console.log('GET route for getGame hit');
         const league = '1';
         const season = '2023';
         const url = `https://v1.american-football.api-sports.io/games?league=${league}&season=${season}`
          const response = await fetch(url,{
              method: "GET",
              headers: {
                  'x-rapidapi-key': process.env.API_SPORTS_KEY,
                  'x-rapidapi-host': 'https://v1.american-football.api-sports.io'
              }as Record<string, string>,
          });
          
          const data: NFLApiResponse = await response.json();
          const games: NFLGameData[] = data.response; 
          await gameService.getNFLGame(games);
          res.status(200).json('message: Games have been succesfully fetched and logged in DB');
  
          return games; 
          
      }catch(error){
          console.error('Error fetching data: ', error);
          return []; 
      }


}

export const getMLBGame = async(req: Request, res: Response): Promise<MLBGameData[]> =>{

  try{
      console.log('GET route for getGame hit');
     const league = '1';
     const season = '2023';
     const url = `https://v1.baseball.api-sports.io/games?league=${league}&season=${season}`
      const response = await fetch(url,{
          method: "GET",
          headers: {
              'x-rapidapi-key': process.env.API_SPORTS_KEY,
              'x-rapidapi-host': 'https://v1.baseball.api-sports.io'
          }as Record<string, string>,
      });
      
      const data: MLBApiResponse = await response.json();
      const games: MLBGameData[] = data.response; 
      await gameService.getMLBGame(games);
      res.status(200).json({message: 'Games have been succesfully fetched and logged in DB', data: data});

      return games; 
      
  }catch(error){
      console.error('Error fetching data: ', error);
      return []; 
  }


}