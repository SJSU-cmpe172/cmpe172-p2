import React, { Component } from "react";
import Dashboard from "../template/Dashboard.js";
import { loadStaff } from "./Userfunctions.js";
import { getJobs } from "./JobFunctions.js";
class AdminPage extends Component {
  constructor() {
    super();
    this.state = {
      staff: [],
      newJobs: [],
      workingJobs: [],
      completedJobs: []
    };
    this.logout = this.logout.bind(this);
  }

  async componentWillMount() {
    //Get List of staff
    await loadStaff().then(res => {
      this.setState({
        staff: res
      });
    });

    //Get list of all jobs (New, Working, Completed)
    await getJobs().then(res => {
      console.log(res);
      let newJob = res.filter(job => job.status === "new");
      let workingJob = res.filter(job => job.status === "working");
      let completedJob = res.filter(job => job.status === "completed");

      this.setState({
        newJobs: newJob,
        workingJobs: workingJob,
        completedJobs: completedJob
      });
    });
  }

  logout() {
    localStorage.clear();
    this.props.history.push("/login");
  }

  render() {
    return (
      <div>
        <Dashboard
          staff={this.state.staff}
          newJobs={this.state.newJobs}
          workingJobs={this.state.workingJobs}
          completedJobs={this.state.completedJobs}
          logout={this.logout}
        />
      </div>
    );
  }
}

export default AdminPage;
