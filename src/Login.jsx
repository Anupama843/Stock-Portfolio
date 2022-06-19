import React, { useState, useContext } from "react";
import loginContext from "./loginContext";
import './Login.css';

function Login() {
    const [username, setUsername] = useState('')
    const { onLoginSubmit } = useContext(loginContext); 
    return (
        <form
            className="login-form"
            onSubmit={(e) => {
                e.preventDefault();
                onLoginSubmit(username);
                setUsername('');
            }}
        >
            <label>
                <span>Username: </span>
                <input
                    className="login-input-username"
                    value={username}
                    onInput={ (e) => {
                        setUsername(e.target.value);
                    }}
                />
            </label>
            <button type="submit" className="loggin-button" disabled={!username}>Login</button>
        </form>
    )
}
export default Login;