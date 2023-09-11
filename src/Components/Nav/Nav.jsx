import React from 'react'
import './nav.css'
import logo from './kmLogo.jpg'
import { Link } from 'react-router-dom'
const Nav = () => {
    return (
        <div id='nav'>
            <Link to='/'>
                <img src={logo} alt="" />
            </Link>
            <h2>E-commerce</h2>
        </div>
    )
}

export default Nav
