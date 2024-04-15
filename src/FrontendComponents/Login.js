import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../CssFiles/Login.css';

//This is the page for the admin to enter a password or a student to use the app
const LoginPage = () => {
    //initialise password and a method to set password with an empty string for UseState
    const [password, setPassword] = useState('');
    //useNavigate allows to move between pages programatically
    const navigate = useNavigate();

    //This handles the actual login logic and is called when the Submit password button is pressed
    //it async so must wait
    const handleLogin = async () => {

        //post method that will get the password from the server and compares to given password (await is async)
        axios.post('http://localhost:4000/login', {
                username: "Admin", // Pass "Admin" as the username
                password: password
            })
            .then(response => { //if the user has entered a valid password
                
                // If authentication is successful, save the authentication token to local storage
                const token = response.data.message;
                localStorage.setItem('authenticationToken', token); // Authentication token is stored in local storage
                localStorage.setItem('isAdmin', true); // Sets isAdin in localStorage to true

                //Bring them to the home page as an admin
                navigate('/Home');
            })
            .catch(error => { // If user entered an incorrect password or there was an error

                //print error messages to the console
                console.log("Login Failed");
                console.log(error.response.data.message);

                alert(error.response.data.message); //Tell the user what went wrong with a pop up
                localStorage.removeItem("isAdmin"); // Remove isAdmin from localStorage
                localStorage.removeItem("authenticationToken") // Remove authentication token from localStorage
            });
    }

    //Shows on the page
    return(
        //uses css
        <div className='loginPage'>
            <h1>Login (Canteen Staff Only)</h1>
            {/* Input box for them to enter the password */}
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
            <br></br>
            {/* This button will call the handleLogin function (check the password) */}
            <button onClick={handleLogin} className='buttons'>Submit Password</button>
            <br></br>
            <h2>Not Admin? Just continue as a regular user!</h2>
            <br></br>
            {/* This just brings you straight to home as a user who can only read and navigate the app */}
            <button onClick={() => navigate('/Home')} className='buttons'>Continue as User</button>
        </div>
    )

}

export default LoginPage;