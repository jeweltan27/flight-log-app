import React from 'react';
import Logo from "../assets/logo.png"; 

const Header = () => {
  return (
    <nav className="navbar navbar-expand navbar-light mb-3">
        <img className="logo" src={Logo} width="130px" alt="Company Logo" />
    </nav>
  )
}

export default Header