import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import jwt_decode from "jwt-decode";

class Landing extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      privilege: "abc",
      errors: {}
    };
  }

  logOut(e) {
    e.preventDefault();
    localStorage.removeItem("usertoken");
    this.props.history.push(`/`);
  }

  linkGroup() {
    if (!localStorage.usertoken) {
      return (
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </li>
        </ul>
      );
    } else if (localStorage.usertoken) {
      let token = localStorage.usertoken;
      let decode = jwt_decode(token);
      if (decode.privilege) {
        return (
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/staffJobs" className="nav-link">
                See Jobs
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/profile" className="nav-link">
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <a href="" onClick={this.logOut.bind(this)} className="nav-link">
                Logout
              </a>
            </li>
          </ul>
        );
      } else {
        return (
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/services" className="nav-link">
                Services
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/profile" className="nav-link">
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <a href="" onClick={this.logOut.bind(this)} className="nav-link">
                Logout
              </a>
            </li>
          </ul>
        );
      }
    }
  }

  render() {
    /*const loginRegLink = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </li>
      </ul>
    );

    const customerLink = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/services" className="nav-link">
            Services
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/profile" className="nav-link">
            Profile
          </Link>
        </li>
        <li className="nav-item">
          <a href="" onClick={this.logOut.bind(this)} className="nav-link">
            Logout
          </a>
        </li>
      </ul>
    );

    const staffLink = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/profile" className="nav-link"></Link>
        </li>
        <li className="nav-item">
          <Link to="/profile" className="nav-link">
            Profile
          </Link>
        </li>
        <li className="nav-item">
          <a href="" onClick={this.logOut.bind(this)} className="nav-link">
            Logout
          </a>
        </li>
      </ul>
    );
*/

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExample10"
          aria-controls="navbarsExample10"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div
          className="collapse navbar-collapse justify-content-md-center"
          id="navbarsExample10"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
          </ul>
          {this.linkGroup()}
        </div>
      </nav>
    );
  }
}

export default withRouter(Landing);
