document.getElementById('profile-form')?.addEventListener('submit', async(e)=>{
    e.preventDefault();

/*
interface User{
  name: string;
    email: string;
    age: Int16Array;
    city: string;
}
*/

let userName: string = document.getElementById('name').value;
let email: string = document.getElementById('email').value;
let password: string = document.getElementById('password').value;
let confirmPassword: string = document.getElementById('confirm-password').value;
let age: number = document.getElementById('age').value;
let city: string = document.getElementById('city').value;



const user ={
    userName,
    email,
    age,
    city
};


if(password !== confirmPassword){
    document.getElementById('error-message').textContent = 'Please ensure passwords match in both fields.';
    return;
}

try{
    const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });

    const result = await response.json();

    if(response == 201){
        alert('Your profile was created successfully!');
        window.location.href = 'WHATEVER LOGIN PAGE IS.html';
    } else { 
        document.getElementById('error-message')?.textContent = result.error || 'An error has occured.';
    }
}catch (error){
    console.error('Error:', error);
    document.getElementById('error-message').textContent = 'Something went wrong. Please try again.';

}







});