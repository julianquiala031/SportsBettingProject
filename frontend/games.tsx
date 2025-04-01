import React, {useState, useEffect} from 'react';
import {io} from "socket.io-client"; 

const socket = io("http://localhost:3000");

function viewGames(){
    const [games, setGames] = useState([]);

    useEffect(()=>{
        socket.on("update", (updates) => {
            setGames(updates);
        });

        return() => {
            socket.off("update");
        };
    }, []);


}


export default viewGames;