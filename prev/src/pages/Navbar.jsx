import React from 'react'
import Auth from '../Aut'
import { Link } from 'react-router-dom'

export const Navbar = () => {
    return (
      <div className="navbar">
        <div className="logo">BETA SERIES</div>
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/friends" className="nav-link">
          Friends
        </Link>
       
        <Auth />
      </div>
    );
  };