import React, { Component } from "react";
import "./App.css";
import Movies from "./components/movies";
import Navbar from "./components/common/navbar";
class App extends Component {
  navItems = [
    { title: "Movies", path: "/movies" },
    { title: "Customers", path: "/customers" },
    { title: "Rentals", path: "/rentals" }
  ];
  render() {
    return (
      <React.Fragment>
        <header>
          <Navbar items={this.navItems} />
        </header>

        <main role="main" class="container mt-2">
          <Movies />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
