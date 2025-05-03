'use client'
import { useState } from "react";
import axios from "axios";

export default function LoginPage({onLoginSuccess}) {
    const [email, setEmail]  = useState('');
    const [password, setPassword] = useState('')

    const handleLogin = async() => {
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { email, password })
            const user = res.data.user
            localStorage.setItem('token', res.data.token)
            alert('Login Successful')

            onLoginSuccess(user)
            console.log("LoggedIn User",user)
            setEmail('')
            setPassword('')
        } catch (error) {
            alert('Login Failed!')
        }
    }
    return(
        <div>
            <h2>Login</h2>
            <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          <button onClick={handleLogin}>Login</button>
        </div>
    )
}
