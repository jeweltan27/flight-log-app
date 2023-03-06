import React from 'react'
import Logo from "../assets/logo.png"; 

const Header = () => {
  return (
    <nav className="navbar navbar-expand navbar-light">
        <img src={Logo} width="110px" alt="Company Logo" />
    </nav>
  )
}

export default Header