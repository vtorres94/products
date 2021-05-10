import React, { useState } from 'react';
import { Segment } from 'semantic-ui-react';
import '../css/Navbar.css';
import { Button } from 'semantic-ui-react';

export interface IHeaderProps {

}

const Header = (props: IHeaderProps) => {
    const [
        state, setState 
    ] = useState({
        clicked: false
    });

    const handleClick = () => {
        setState({clicked: !state.clicked })
    }

    return (
        <nav className="NavbarItems" style={{
            background: '#2ACFFF',
            height: '100px',
            width: '100%'
        }}>
            <h1 className="navbar-logo">Products<i className="arlogo fab fa-wolf-pack-battalion"></i></h1>
            
            <ul className={state.clicked ? "nav-menu active" : "nav-menu"}>
                <li className="nav-links"><a>Productos</a></li>
            </ul>
            <div className="menu-icon" onClick={handleClick}>
                <i className={state.clicked ? "fas fa-times" : "fas fa-bars"}></i>
            </div>
            <Button className="nav-links-mobile" color="black">Log in</Button>

            
        </nav>
    )
}

export default Header;
