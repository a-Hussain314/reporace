import React from 'react'
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header>
            <div className="container">

                <h1> <Link to="/"> Repo Race </Link> </h1>

            </div>
        </header>
    )
}
export default Header;
