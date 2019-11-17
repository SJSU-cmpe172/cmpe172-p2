import React, { Component } from "react";
import { createValetJob } from "./Servicefunctions";

class ValetJob extends Component {
  constructor(props) {
    super (props);
    this.state = {
      ticketNo: null
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const job = {
      type: 'valet',
      status: 'new',
      timeCreated: this.state.timeCreated, //Change to now datetime
      ticketNo: this.state.ticketNo
    };

    createValetJob(this.state.ticketNo);

  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Valet Request</h1>
              <div className="form-group">
                <label htmlFor="ticketNo">Ticket Number</label>
                <input
                  type="text"
                  className="form-control"
                  name="ticketNo"
                  placeholder="Enter Valet Ticket Number"
                  value={this.state.ticketNo}
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

export default ValetJob;
