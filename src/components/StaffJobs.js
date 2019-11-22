import React, { Component } from "react";
import SplitPane from "react-split-pane";
import jwt_decode from "jwt-decode";
import { 
  Button,
  Card, CardHeader, CardContent, CardActions, 
  IconButton, Typography
} from '@material-ui/core';
import { Add } from '@material-ui/icons'; 

import { getMyJobs } from "./JobFunctions";
import { getNewJobs } from "./JobFunctions";

class StaffJobs extends Component {
  constructor() {
    super();
    this.state = {
      newJobs: [
        { jobId: 123, dtCreated: Date.now(), type: 'food' }
      ],
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
  setWorking() {
    console.log('setWorking')
  }
  jobCard(job) {
    let color;
    switch( job.type ) {
      case 'food':
        color = 'green'
      default:
        color = 'white'
    }
    return(
      <Card style={ {maxWidth: "275px", margin: "5px", "color": color} }>
        <CardHeader
          title={ job.jobId }
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p"> { job.dtCreated } </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="work" onClick={ () => this.setWorking(job) }>
            <Add />
          </IconButton>
        </CardActions>
      </Card>
    )
  }
  render() {
    return (
      <SplitPane defaultSize="50%">
        <div className="container">
          { this.state.newJobs.map((job) => this.jobCard(job) ) }
        </div>
      </SplitPane>
    );
  }
}

export default StaffJobs;
