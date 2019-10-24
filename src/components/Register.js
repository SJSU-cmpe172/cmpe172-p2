import React, { Component } from "react";
import SplitPane from "react-split-pane";
import { registerStaff } from "./Userfunctions";
import RegStaff from "./RegStaff";
import RegCustomer from "./RegCustomer";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      staffUsername: "",
      staffPassword: "",
      privilege: "",
      errors: {}
    };

    this.onSubmitStaff = this.onSubmitStaff.bind(this);
    this.onSubmitCustomer = this.onSubmitCustomer.bind(this);
  }

  onSubmitStaff(userN, pw, priv) {
    const newStaff = {
      username: userN,
      password: pw,
      privilege: priv
    };
    registerStaff(newStaff).then(res => {
      this.props.history.push("/login");
    });
  }

  onSubmitCustomer(userN, pw) {
    const newCust = {
      username: userN,
      password: pw
    };

    registerStaff(newCust).then(res => {
      this.props.history.push("/login");
    });
  }

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

  render() {
    return (
      <SplitPane defaultSize="50%">
        <div className="container">
          <RegStaff subStaff={this.onSubmitStaff} />
        </div>
        <div className="container">
          <RegCustomer subCust={this.onSubmitCustomer} />
        </div>
      </SplitPane>
    );
  }
}
export default Register;
