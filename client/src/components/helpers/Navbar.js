import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../logo.svg'
import '../../styles/helpers/Navbar.css'

const Navbar = () => {
    return (
        <header className='nav'>
            <Link to='/' className='nav-brand'>
                <img src={Logo} alt='logo' className='nav-logo'/>
                <h2>Superfluid</h2>
            </Link>
        </header>
    )
}

export default Navbar