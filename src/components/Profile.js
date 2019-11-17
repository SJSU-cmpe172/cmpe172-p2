import React, { Component } from "react";
import jwt_decode from "jwt-decode";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      privilege: "",
      errors: {}
    };
  }

  componentDidMount() {
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    this.setState({
      username: decoded.username,
      privilege: decoded.privilege
    });
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">PROFILE</h1>
          </div>
          <table className="table col-md-6 mx-auto">
            <tbody>
              <tr>
                <td>username</td>
                <td>{this.state.username}</td>
              </tr>
              <tr>
                <td>position</td>
                <td>{this.state.privilege}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default Profile;
