import React, { Component } from "react";
import { loadDestinations } from "./Servicefunctions";
import { createShuttleJob } from "./Servicefunctions";


class ShuttleJob extends Component {
  constructor(props) {
    super (props);
    this.state = {
      destinationList: [],
      pickUpTime: '',
      pickUpDate: '',
      destination: '-1'
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  async componentDidMount() {
    let destinations;
    await loadDestinations().then(res => {
      destinations = res;
      console.log(destinations);
    });
    this.setState({
      destinationList: destinations
    });
    this.createSelectDestinations()
    console.log(this.state.destinationList[0].destinationName);
  }

  createSelectDestinations() {
    // let destinations = [];
    // this.state.destinationList.map((d, i) => {
    //   destinations.push({value: d.name, label: d.name})
    // });
    let destinations = this.state.destinationList.map((d, i) => {
      return <option key={i} value={d.name}>{d.name + " (" + d.code + ")"}</option>
    });
    //console.log(destinations)
    return destinations;
  }  

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  }

  onSubmit(e) {
    e.preventDefault();

    const jobData = {
      type: 'shuttle',
      status: 'new',
      pickupDT: this.state.pickUpDate + "T" + this.state.pickUpTime,
      destination: this.state.destination
    };
    
    console.log(this.jobData);
    
    createShuttleJob(jobData);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Shuttle Request</h1>
              <div className="form-group">
                <label htmlFor="destination">Destination</label>
                <select
                  className="form-control"
                  name="destination"
                  value={this.state.destination}
                  onChange={this.onChange}
                >
                  <option value='-1' default>Select a Destination...</option>
                  {this.createSelectDestinations()}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="pickUpTime">Pickup Time</label>
                <input
                  type="time"
                  className="form-control"
                  name="pickUpTime"
                  placeholder="Enter Pickup Time"
                  value={this.state.pickUpTime}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                  <label htmlFor="pickUpDate">Pickup Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="pickUpDate"
                    placeholder="Enter Date"
                    value={this.state.pickUpDate}
                    onChange={this.onChange}
                  />
              </div>
              <button
                  type="submit"
                  className="btn btn-lg btn-primary btn-block"
                >
                Submit
              </button>
            </form>
            </div>
          </div>
        </div>
    );
  }
}

export default ShuttleJob;
