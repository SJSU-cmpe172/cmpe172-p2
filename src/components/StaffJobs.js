import React, { Component } from "react";
import SplitPane from "react-split-pane";
import jwt_decode from "jwt-decode";
import { 
  Button,
  Container,
  Grid,
  Card, CardHeader, CardContent, CardActions, 
  IconButton, Typography
} from '@material-ui/core';
import { Add, Done } from '@material-ui/icons'; 

import { getMyJobs, getNewJobs, workJob, completeJob } from "./JobFunctions";

class StaffJobs extends Component {
  constructor() {
    super();
    this.state = {
      newJobs: [
        { jobId: 123, dtCreated: Date.now(), type: 'kitchen' }
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
      myJobs = res.data.filter( (o)=>{if (o.status!=="completed") return o} );
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
  setWorking(job) {
    console.log('setWorking')
    let staffJobs = this.state.staffJobs.concat([job]);
    let newJobs = this.state.newJobs.filter( (o)=> { if (o.id!==job.id) return o; });
    workJob( job.id, this.staffId );
    this.setState( { staffJobs: staffJobs, newJobs: newJobs } )
  }
  setDone(job){
    console.log('setDone')
    let staffJobs = this.state.staffJobs.filter( (o)=> { if (o.id!==job.id) return o; });
    completeJob( job.id );
    this.setState( { staffJobs: staffJobs } )
  }
  jobCard(job, pnew) {
    let color;
    console.log(job);
    switch( job.type ) {
      case "kitchen":
        color = '#FA8072';
        break
      case "valet":
        color = '#FF4500';
        break
      case "amenities":
        color = '#CD853F';
        break
      default:
        color = '#B0C4DE';
    }
    var timeCreated = new Date(job.dtCreated);
    var month = timeCreated.getMonth()+1;
    var day = timeCreated.getDate();
    var hours = timeCreated.getHours();
    var minutes = "0" + timeCreated.getMinutes();
    var seconds = "0" + timeCreated.getSeconds();
    var formattedTime =  `${month}/${day} - ${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`;
    var roomStr = 'Room: '+ job.room + '\t\ttype: ' + job.type; 
    var action;
    if (pnew) { 
      action = (<IconButton aria-label="work" onClick={ () => this.setWorking(job) }><Add /></IconButton>);}
    else action = (<IconButton aria-label="work" onClick={ () => this.setDone(job) }><Done /></IconButton>);
    return(
      <Grid direction='row' style={ {width: "100%", margin: "5px"} }>
        <Card style={ {width: "100%", margin: "5px", backgroundColor: color} }>
          <CardContent style={ {maxHeight:"20px", display:"flex", flexFlow: "row wrap", position: "relative"} }>
            <Typography variant="body2" color="textSecondary" component="p"> { roomStr } </Typography>
            <Typography variant="body2" color="textSecondary" component="p" style={{position: "absolute", right: "10px"}}> { formattedTime } </Typography>
          </CardContent>
          <CardActions disableSpacing style={ {margin: "0px", padding: "0px", maxHeight:"25px"} }>
            { action }
          </CardActions>
        </Card>
      </Grid>
    )
  }
  render() {
    return (
      <Container style={{ display:"flex" }}>
        <Grid direction='column' xs={6} style={{ display:"flex", flexFlow: "row wrap" }}>
          { this.state.newJobs.map((job) => this.jobCard(job, true) ) }
        </Grid>
        <Grid direction='column' xs={6} style={{ display:"flex", flexFlow: "row wrap" }}>
          { this.state.staffJobs.map((job) => this.jobCard(job, false) ) }
        </Grid>
      </Container>
    );
  }
}

export default StaffJobs;
