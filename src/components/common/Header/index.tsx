import React from 'react';
import logo from '../../../logo.svg';
import './Header.css';

/**
 * Header component
 *
 * @returns {JSX.Element} Sticky Header
 */
const Header = (): JSX.Element => {
    return (
        <nav className='Navbar'>
            <div className='Title-container'>
                <img src={logo} className='App-logo' alt='logo' />
                <h1 className='App-header'> Example of XML File Upload, Convert and JSON Files Management</h1>
            </div>
        </nav>
    );
}

export default Header;