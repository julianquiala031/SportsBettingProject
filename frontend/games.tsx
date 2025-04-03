import React, {useState, useEffect} from 'react';

//Current implementation fetches the entire gamesList at once

const gamesList = () => {
    const [games, setGames] = useState([]);
    //const [loading, setLoading] = useState(true);
    const [lastFetched, setLastFetch] = useState(Date.now());

    const getGames = async () => {
        try{
            const res = await fetch('http:localhost:3000/games/get-NBA-Game?since=${lastFetched}');
            const data = await res.json();
            setGames(data);
            setLastFetch(Date.now());
            //setLoading(false); 

        }catch(error){
            console.error('There was an error retrieving games to frontend: ', error);
        }
    };



useEffect(() => {
    getGames();

    const interval = setInterval(getGames, 30000);

    return () => clearInterval(interval);
}, [lastFetched]);


}