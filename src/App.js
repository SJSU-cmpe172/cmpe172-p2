import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";

import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Services from "./components/Services";
import Amenities from "./components/Amenities";
import Food from "./components/Food";
import ShuttleJob from "./components/Shuttle";
import ValetJob from "./components/Valet";
import AdminPage from "./components/AdminPage";

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
            <Route exact path="/shuttle" component={ShuttleJob} />
            <Route exact path="/valet" component={ValetJob} />
            <Route exact path="/admin" component={AdminPage} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
