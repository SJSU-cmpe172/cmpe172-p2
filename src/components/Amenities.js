import React, { Component } from "react";
import SplitPane from "react-split-pane";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { loadItems } from "./Servicefunctions";
import ItemCard from "./ItemCard";
import { createAmenityJob } from "./Servicefunctions";

class Amenities extends Component {
  constructor() {
    super();
    this.state = {
      itemList: [],
      orderList: [],
      dateTime: Date.now()
    };
    this.addToList = this.addToList.bind(this);
    this.requestAmenities = this.requestAmenities.bind(this);
    this.clearList = this.clearList.bind(this);
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
    console.log(this.state.itemList[0].itemName);
  }

  addToList = newItem => {
    let items = this.state.orderList;
    items.push(newItem);
    this.setState({ orderList: items });
  };

  requestAmenities() {
    let items = this.state.orderList;
    createAmenityJob(items);
  }

  clearList() {
    this.setState({ orderList: [] });
  }

  render() {
    return (
      <SplitPane defaultSize="70%">
        <Grid container spacing={1}>
          <Grid item xs={9}>
            <Grid container justify="center" spacing={1}>
              {this.state.itemList.map(item => (
                <Grid item key={item.itemName}>
                  <ItemCard
                    itemName={item.itemName}
                    itemImage={item.itemUrl}
                    updateList={this.addToList}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <div>
          <h3>Wish List</h3>
          <ul>
            {this.state.orderList.map(item => (
              <li>{item}</li>
            ))}
          </ul>
          <div>
            <Button
              onClick={this.requestAmenities}
              size="small"
              color="primary"
            >
              Request Items
            </Button>
            <Button onClick={this.clearList} size="small" color="secondary">
              Clear Items
            </Button>
          </div>
        </div>
      </SplitPane>
    );
  }
}
export default Amenities;
