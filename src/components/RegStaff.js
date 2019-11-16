import React, { Component } from "react";
import { registerStaff } from "./Userfunctions";

class RegStaff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      privilege: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmitStaff = this.onSubmitStaff.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmitStaff(e) {
    e.preventDefault();
    const newStaff = {
      username: this.state.username,
      password: this.state.password,
      privilege: this.state.privilege
    };
    if(registerStaff(newStaff))
      this.props.close();
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate>
              <h1 className="h3 mb-3 font-weight-normal">Register Staff</h1>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  placeholder="Enter username"
                  value={this.state.username}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Enter password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Position</label>
                <input
                  type="name"
                  className="form-control"
                  name="privilege"
                  placeholder="Enter position"
                  value={this.state.privilege}
                  onChange={this.onChange}
                />
              </div>
              <button
                onClick={this.onSubmitStaff}
                className="btn btn-lg btn-primary btn-block"
              >
                Register!
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default RegStaff;
