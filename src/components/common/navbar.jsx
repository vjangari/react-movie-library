import React from "react";
import { NavLink, Link } from "react-router-dom";
const Navbar = ({ items }) => {
  return (
    <header>
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          Vidly
        </Link>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {items.map((item, index) => (
              <li key={index} className="nav-item">
                <NavLink className="nav-link" to={item.path}>
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
