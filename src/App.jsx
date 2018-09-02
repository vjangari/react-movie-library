import React, { Component } from "react";
import "./App.css";
import Movies from "./components/movies";
class App extends Component {
  render() {
    return (
      <main role="main" className="app container">
        <React.StrictMode>
          <Movies />
        </React.StrictMode>
      </main>
    );
  }
}

export default App;
