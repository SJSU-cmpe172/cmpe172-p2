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

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/regCustomer" component={RegCustomer} />
            <Route exact path="/regStaff" component={RegStaff} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/services" component={Services} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/amenities" component={Amenities} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
