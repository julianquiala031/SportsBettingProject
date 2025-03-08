import React, {useState, useEffect} from 'react'; 

function login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


    const submit = (e) => {
        e.preventDefault();

        const userData = {email, password};

        fetch('http://localhost:3000/users',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
            })
            .then((response) => response.json())
        .then((data) => {
            console.log('Logging in user with data', data);
             //resets states to blank after submission
            
            setEmail('');
            setPassword('');
        })
        .catch((error)=> {
            console.error('There was an error in user creation: ', error);
            setError('Failed to create user.');
        });


    }



}