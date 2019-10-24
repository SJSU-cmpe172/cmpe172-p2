import React, { Component } from "react";
import { loadItems } from "./Servicefunctions";

class Services extends Component {
  constructor() {
    super();
    this.state = {
      itemList: []
    };
  }

  async componentDidMount() {
    let items;
    await loadItems().then(res => {
      items = res;
      console.log(items);
    });
    this.setState({
      itemList: items
    });
    console.log(this.state);
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">PROFILE</h1>
          </div>
          <table className="table col-md-6 mx-auto">
            <tbody>
              <tr>
                <td>username</td>
                <td>name placeholder</td>
              </tr>
              <tr>
                <td>position</td>
                <td>pos placeholder</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default Services;
