import React, {useState, useEffect} from 'react';

function placeBet(){

    const [user_id, setUser_id] = useState('');
    const [game_id, setGame_id] = useState('');
    const [bet_type, setBet_type] = useState('');
    const [bet_side, setBet_side] = useState('');
    const [amount, setAmount] = useState('');
    const [odds, setOdds] = useState('');
    const [error, setError] = useState('');

    const submit = (e) =>{
        e.preventDefault();

        if(!user_id || !game_id || !bet_type || !bet_side || !amount || !odds || !error){
            setError('All fields are required.'); return;
        }

        const thisBet = {user_id, game_id, bet_type, bet_side, amount, odds};

        fetch('http://localhost:3000/bets',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(thisBet),
        })
        .then((response)=> response.json())
        .then((data)=>{
            console.log('Placing bet with this data: ', data);
            setUser_id('');
            setGame_id('');
            setBet_type('');
            setBet_side('');
            setAmount('');
            setOdds('');
            setError('');
        })
        .catch((error)=> { 
            console.error('There was an error placing the bet: ', error);
            setError('Error in placing bet.');
        })
    }





}

