import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async () => {
        try {

            //make a post request to login endpoint
            const response = await axios.post('http://localhost:5000/api/login', {
                username,
                password,
            });
            // display the login success message
            console.log(response.data.message);
            //Call the onlogin callback with the user data
            onLogin({ username, userId: response.data.userId })
        } catch (error) {

            console.log('Error during login', error.response.data.message);
        }
    };
    const handleRegister = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/register', {
            username,
            password,
            });
            
            console.log(response.data.message);
            // automatic login user after registration
            handleLogin();
        } catch (error) {
            
            console.error('Error registering user', error.response.data.message)
        }
    }

    return (
        <div>
            <h2>Login</h2>
            <label>Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />

            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

            <button onClick={handleLogin}>Login</button>
            <button onClick={handleRegister}>Register</button>
        </div>
    )
}

export default Login