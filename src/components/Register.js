import React, { Component } from "react";
import SplitPane from "react-split-pane";
import { registerStaff } from "./Userfunctions";
import RegStaff from "./RegStaff";
import RegCustomer from "./RegCustomer";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      privilege: "",
      errors: {}
    };
    /*
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    console.log("pressed submit");

    const newUser = {
      username: this.state.username,
      password: this.state.password,
      privilege: this.state.privilege
    };
    console.log(newUser);

    registerStaff(newUser).then(res => {
      this.props.history.push("/login");
    });
    */
  }

  render() {
    return (
      <SplitPane defaultSize="50%">
        <div className="container">
          <RegStaff />
        </div>
        <div className="container">
          <RegCustomer />
        </div>
      </SplitPane>
    );
  }
}

export default Register;
