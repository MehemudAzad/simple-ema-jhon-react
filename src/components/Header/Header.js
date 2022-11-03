import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../images/Logo.svg'
import { AuthContext } from '../contexts/UserContext';
import './Header.css'

const Header = () => {
    const {user, logOut} = useContext(AuthContext);

    return (
       <nav className='header'>
        <img src={logo} alt="" />
        <div>
            <NavLink to="/">Shop</NavLink>
            <NavLink to="/orders">Orders</NavLink>
            <NavLink to="/inventory">Inventory</NavLink>
            <NavLink to="/about">About</NavLink>
            
            {
                user?.uid ?
                <button className='btn-logout' onClick={logOut}>Sign Out</button>
                :
                <>
                <Link to='/login'>Login</Link>
                {/* <Link to='/signup'>Sign up</Link> */}
                </>
            }
            <span className='header-email'>{user?.email}</span>
        </div>
       </nav>
    );
};

export default Header;