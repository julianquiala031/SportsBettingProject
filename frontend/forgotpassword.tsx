import React, { use, useState } from "react";

function forgotPassword(){
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const submit = (e) => {
        e.preventDefault;

        fetch('http://localhost:3000/auth/forgot-password',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(email),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Sending reset link to email: ', data);
             //resets states to blank after submission
            setEmail(''); 
        })
        .catch((error)=> {
            console.error('There was an error in resetting your password: ', error);
            setError('Failed to reset password.');
        });

    }

}

