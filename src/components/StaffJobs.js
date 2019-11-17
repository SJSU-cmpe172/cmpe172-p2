import React, { Component } from "react";
import SplitPane from "react-split-pane";

class StaffJobs extends Component {
  constructor() {
    super();
    this.state = {
      newJobs: [],
      staffJobs: [],
      staffName: "",
      privilege: ""
    };
  }

  async componentDidMount() {
    let newJobs;
    await loadItems().then(res => {
      items = res;
      console.log(items);
    });
    this.setState({
      itemList: items
    });
    console.log(this.state.itemList[0].itemName);
  }

  render() {
    return (
      <SplitPane defaultSize="50%">
        <div className="container">
          <ul></ul>
        </div>
        <div className="container">
          <RegCustomer subCust={this.onSubmitCustomer} />
        </div>
      </SplitPane>
    );
  }
}

export default StaffJobs;
