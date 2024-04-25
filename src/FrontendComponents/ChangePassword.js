import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../CssFiles/Login.css';
import { getAuthenticationTokenFromLocalStorage } from '../utilities/utils';

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
   
    const navigate = useNavigate();

   const passwordChanger = async () =>{
    if(newPassword !== repeatPassword){
        alert("Passwords do not match");
        return;
    }

    const token = getAuthenticationTokenFromLocalStorage();

    try {
        
        await axios.put('http://localhost:4000/update_password', {
            username: "Admin",
            oldPassword: oldPassword,
            newPassword: newPassword
        }, {
            headers: {
                Authorization: token
            }
        }
    );
    alert("Password Updated")
    navigate('/');

    }
    catch(error){
        console.log(error.response.data.message);
    }
   }

    return (
        <div className='loginPage'>
            <h1>Change Password</h1>
            <h3>Old Password</h3>
            {/* Input box for them to enter the password */}
            <input type='password' value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}  />
            <br></br>
            <h3>New Password</h3>
            <input type='password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
            <br></br>
            <h3>Repeat New Password</h3>
            <input type='password' value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)}/>
            {/* This button will call the handleLogin function (check the password) */}
            <br></br>
            <br></br>
            {/* This just brings you straight to home as a user who can only read and navigate the app */}
            <button className='buttons' onClick={passwordChanger}>Change Password</button>
            
        </div>
    );
};

export default ChangePassword;