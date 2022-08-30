import React, { useState } from "react";
import logo from "../../images/logo.png";
import './Navbar.css';
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);
const [active, setActive] = useState("1");

  const handleClick = (event) => {
    setActive(event.target.id);
  };

  return (
    <nav className="main-nav">
      <div className="logo">
        <img src={logo} alt="img" />
      </div>
      <div className={isOpen ? " mobile-menu-link" : "menu-link"}>
        {/* <div className="flex">
          <img src={logo} alt="logo" className="mobilelogo"></img>
        </div> */}
        <ul className="navbarul">
          <li>
            <a
              className={active === "1" ? "actived" : ""}
              href="#"
              id={"1"}
              onClick={handleClick}
            >
              Home
            </a>
          </li>
          <li>
            <a
              className={active === "2" ? "actived" : ""}
              href="#discover"
              id={"2"}
              onClick={handleClick}
            >
              Discover
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noreferrer"
              href="#aboutus"
              className={active === "3" ? "actived" : ""}
              id={"3"}
              onClick={handleClick}
            >
              About Us
            </a>
          </li>
          <li>
            <NavLink
              className={active === "4" ? "actived" : ""}
              id={"4"}
              onClick={handleClick}
              to="/"
            >
              Staking
            </NavLink>
          </li>
          <li>
            <NavLink
              className={active === "5" ? "actived" : ""}
              id={"5"}
              onClick={handleClick}
              to="/"
            >
              Market
            </NavLink>
          </li>
      
        </ul>
        {/* hamburger menu code below */}
      </div>
       <div className="button">
        <button className="contact-btn">connect wallet</button>
        <div className="ham">
          <GiHamburgerMenu onClick={() => setOpen(!isOpen)} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
