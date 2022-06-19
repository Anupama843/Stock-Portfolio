import React from "react";
import './Header.css';

function Header({username, onLogout}) {

    return (
        <header className="header">
            <div className="container">
                <span className="header-title">AS Portfolio</span>
                {username && (
                    <div>
                        <span className="header-welcome">Welcome {<span className="header-welcome-username">{username}</span>} {<span>|</span>} </span>
                        <button className="logout" onClick={onLogout}>Logout</button>
                    </div>
                )}
            </div>
        </header>

    )
}

export default Header;