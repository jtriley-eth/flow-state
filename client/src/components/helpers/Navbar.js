import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../logo.svg'
import '../../styles/helpers/Navbar.css'
import Hamburger from './Hamburger'

const Navbar = props => {
    const { toggleMenu, showMenu } = props
    return (
        <header className='nav'>
            <Link to='/' className='nav-brand'>
                <img src={Logo} alt='logo' className='nav-logo'/>
                <h2>Flow State</h2>
            </Link>
            <Hamburger toggleMenu={toggleMenu} showMenu={showMenu} />
        </header>
    )
}

export default Navbar