import React, { Component } from "react";
import SplitPane from "react-split-pane";
import jwt_decode from "jwt-decode";

import { getMyJobs } from "./JobFunctions";
import { getNewJobs } from "./JobFunctions";

class StaffJobs extends Component {
  constructor() {
    super();
    this.state = {
      newJobs: [],
      staffJobs: [],
      staffId: "",
      privilege: ""
    };
  }

  async componentDidMount() {
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);

    let newJobs;
    await getNewJobs().then(res => {
      newJobs = res;
    });

    let myJobs;
    await getMyJobs(decoded.username).then(res => {
      myJobs = res;
    });
    this.setState({
      staffId: decoded.staffId,
      privilege: decoded.privilege,
      newJobs: newJobs,
      staffJobs: myJobs
    });
  }

  render() {
    return (
      <SplitPane defaultSize="50%">
        <div className="container">
          <ul>
            {this.state.newJobs.map((job, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="container">
          <RegCustomer subCust={this.onSubmitCustomer} />
        </div>
      </SplitPane>
    );
  }
}

export default StaffJobs;
