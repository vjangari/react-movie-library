import React from "react";

const Navbar = ({ items }) => {
  return (
    <header>
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <a class="navbar-brand" href="#">
          Vidly
        </a>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            {items.map(item => (
              <li class="nav-item active">
                <a class="nav-link" href={item.path}>
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
