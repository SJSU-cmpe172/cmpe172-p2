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
      newJobs = res.data;
    });

    let myJobs;
    await getMyJobs(decoded.username).then(res => {
      myJobs = res.data;
      console.log(myJobs);
    });
    this.setState({
      staffId: decoded.staffId,
      privilege: decoded.privilege,
      newJobs: newJobs,
      staffJobs: myJobs
    });
    console.log(this.state);
  }

  render() {
    return (
      <SplitPane defaultSize="50%">
        <div className="container">
          <h3>new jobs</h3>
          {
            <ul>
              {this.state.newJobs.map((job, i) => (
                <li key={i}>{job}</li>
              ))}
            </ul>
          }
        </div>
        <div className="container">
          <h3>my jobs</h3>
          {
            <ul>
              {this.state.staffJobs.map((job, i) => (
                <li key={i}>{job}</li>
              ))}
            </ul>
          }
        </div>
      </SplitPane>
    );
  }
}

export default StaffJobs;
