import React, {useState, useEffect} from 'react';
import { NBAGame, NFLGame, MLBGame} from '../backend/types';





const nbaGamesList = () => {
    const [games, setGames] = useState<NBAGame[]>([]);
    
    const [lastFetched, setLastFetch] = useState(Date.now());

    const initPull = async() =>{ //does initial large pull of all games
        try{
             const res = await fetch(`http://localhost:3000/game/get-NBA-Game`); //large game pull endpoint 
             const data = await res.json();
             setGames(data.games);
             setLastFetch(Date.now()); //sets Since timestamp
        }catch(error){
            console.error('Error in the initial pull of games: ', error);
        }
    }

    const getGames = async () => {
        try {
          const res = await fetch(`http://localhost:3000/games/updateNBAGame?since=${lastFetched}`); //does delta update pull using lastFetched
          const data = await res.json();
    
          if (data.games?.length > 0) { //checks if there's any new games
            setGames((prevGames) => { 
              const updatedGames = data.games;
              const updatedIds = new Set(updatedGames.map((g) => g.id));
    
              
              const merged = [
                ...prevGames.filter((g) => !updatedIds.has(g.id)),
                ...updatedGames
              ];
    
              return merged;
            });
          }
    
          setLastFetch(Date.now());
useEffect(()=> {
    initPull();
}, []);

useEffect(() => {
    const interval = setInterval(getGames, 30000);

    return () => clearInterval(interval);
}, [lastFetched]);


}catch(error){
    console.error('Error in retrieving games to frontend: ', error);
}
    }
}

const nflGamesList = () => {
    const [games, setGames] = useState<NFLGame[]>([]);
    
    const [lastFetched, setLastFetch] = useState(Date.now());

    const initPull = async() =>{ //does initial large pull of all games
        try{
             const res = await fetch(`http://localhost:3000/game/get-NFL-Game`); //large game pull endpoint 
             const data = await res.json();
             setGames(data.games);
             setLastFetch(Date.now()); //sets Since timestamp
        }catch(error){
            console.error('Error in the initial pull of games: ', error);
        }
    }

    const getGames = async () => {
        try {
          const res = await fetch(`http://localhost:3000/games/updateNFLGame?since=${lastFetched}`); //does delta update pull using lastFetched
          const data = await res.json();
    
          if (data.games?.length > 0) { //checks if there's any new games
            setGames((prevGames) => { 
              const updatedGames = data.games;
              const updatedIds = new Set(updatedGames.map((g) => g.id));
    
              
              const merged = [
                ...prevGames.filter((g) => !updatedIds.has(g.id)),
                ...updatedGames
              ];
    
              return merged;
            });
          }
    
          setLastFetch(Date.now());
useEffect(()=> {
    initPull();
}, []);

useEffect(() => {
    const interval = setInterval(getGames, 30000);

    return () => clearInterval(interval);
}, [lastFetched]);


}catch(error){
    console.error('Error in retrieving games to frontend: ', error);
}
    }
}

const mlbGamesList = () => {
    const [games, setGames] = useState<MLBGame[]>([]);
    
    const [lastFetched, setLastFetch] = useState(Date.now());

    const initPull = async() =>{ //does initial large pull of all games
        try{
             const res = await fetch(`http://localhost:3000/game/get-MLB-Game`); //large game pull endpoint 
             const data = await res.json();
             setGames(data.games);
             setLastFetch(Date.now()); //sets Since timestamp
        }catch(error){
            console.error('Error in the initial pull of games: ', error);
        }
    }

    const getGames = async () => {
        try {
          const res = await fetch(`http://localhost:3000/games/updateMLBGame?since=${lastFetched}`); //does delta update pull using lastFetched
          const data = await res.json();
    
          if (data.games?.length > 0) { //checks if there's any new games
            setGames((prevGames) => { 
              const updatedGames = data.games;
              const updatedIds = new Set(updatedGames.map((g) => g.id));
    
              
              const merged = [
                ...prevGames.filter((g) => !updatedIds.has(g.id)),
                ...updatedGames
              ];
    
              return merged;
            });
          }
    
          setLastFetch(Date.now());
useEffect(()=> {
    initPull();
}, []);

useEffect(() => {
    const interval = setInterval(getGames, 30000);

    return () => clearInterval(interval);
}, [lastFetched]);


}catch(error){
    console.error('Error in retrieving games to frontend: ', error);
}
    }
}