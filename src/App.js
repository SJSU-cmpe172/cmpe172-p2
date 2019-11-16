import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";

import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Services from "./components/Services";
import RegCustomer from "./components/RegCustomer";
import RegStaff from "./components/RegStaff";
import Amenities from "./components/Amenities";
import Food from "./components/Food";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/login" component={Login} />
            <Route exact path="/services" component={Services} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/amenities" component={Amenities} />
            <Route exact path="/food" component={Food} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
