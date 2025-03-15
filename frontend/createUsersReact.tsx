import React, {useState, useEffect} from 'react';


function createUser(){
    //state variables to hold each data from form
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');
    const [city, setCity] = useState('');
    const [error, setError] = useState('');

    const submit = (e) =>{
        e.preventDefault();
        //returns error if any are empty
        if (!name || !email || !password || !age || !city){
            setError('All fields are required.'); return; 
        } 

        const userData = {name, email, password, age, city};
        fetch('http://localhost:3000/users',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Creating user with data: ', data);
             //resets states to blank after submission
            setName('');
            setEmail('');
            setPassword('');
            setAge('');
            setCity('');
            setError('');
        })
        .catch((error)=> {
            console.error('There was an error in user creation: ', error);
            setError('Failed to create user.');
        });
       
        


    };

    






}




