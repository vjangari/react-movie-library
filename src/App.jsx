import React, { Component } from "react";
import "./App.css";
import Movies from "./components/movies";
import Navbar from "./components/common/navbar";
import { Route, Switch, Redirect } from "react-router-dom";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
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

        <main role="main" className="container mt-2">
          <Switch>
            <Route path="/movies" component={Movies} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/" exact component={Movies} />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
