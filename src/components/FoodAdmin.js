// This is a page where restunt staff can add or remove dishes from the menu
// The account has to be a staff member of a buffet// This is a food service page for hotel clients.
// User gets here from homepage by selecting a food service
import React, { Component } from "react";
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { 
  Box, Button,
  Card, CardHeader , CardMedia, CardContent, CardActions, 
  Divider,
  Grid,
  List, ListItem,
  Container, Collapse, Avatar, IconButton, Typography, red
} from '@material-ui/core';
import { 
  FavoriteIcon, ShoppingCart, Delete
} from '@material-ui/icons'; 
const axios = require('axios');

const deft_img = "https://i.imgur.com/DOTJi6h.jpg";

const HOST = 'http://localhost:5000/api/food/'
async function post (addr, data) {
  const options = {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    mode:   'cors',
    body:   JSON.stringify(data)
  };
  console.log(HOST+addr);
  const res = await fetch(HOST+addr, options);
  return await res.json();
}

let get = async (addr) => {
  const res = await fetch(HOST+addr, { mode: "cors" });
  const bod = await res.json();
  return bod;
}

class Food extends Component {
  constructor() {
    super();
    this.state = {
      menu: [ ],
      cartPrice: 0,
    };
  }
  componentDidMount = async () => {
    let res = await get('menu');
    console.log(res);
    this.setState( { menu: res.map( (r) => {
      return {
        name: r.name, 
        desc: r.desc, 
        price: r.price, 
        image: r.image,
        count: 0 }
      })} );
  } 
  makeDish( f ) {
    axios.post("/api/food/create", {
      name:  f.itemName,  // str
      desc:  f.itemDescr, // str
      price: f.itemPrice, // float
      image: f.itemUrl,   // str image address
      // time:  f.time,      // int time of day when served: 1: morning 2: afternoon 4: evening
      // type:  f.type,      // int 0: dessert, 1:
    });
  }
  removeDish(foodID) {
    axios.post("/api/food/delete", { foodID: foodID });
    this.setState({ menu: this.state.menu.filter( (o) => { if (o.name!==foodID) return o } )});
  }
  foodItem( f ) {
    return (
      <ListItem>
        <ListItemAvatar>
          <Avatar
            alt={`Avatar n°${value + 1}`}
            src={`/static/images/avatar/${value + 1}.jpg`}
          />
        </ListItemAvatar>
        <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
        <ListItemSecondaryAction>
          <IconButton aria-label="add to cart" onClick={ () => this.removeDish(food) }>
              <Delete />
            </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
  render() {
    return (
      <Container style={{ display:"flex" }}>  
        <Grid direction='column' xs={10} style={{ display:"flex", flexFlow: "row wrap" }}>
          { this.state.menu.map( (o) => this.foodItem(o) ) }
        </Grid>
        <Grid direction='column' xs={2} style={{ display:"flex", flexFlow: "row wrap", position: "relative"}}>
          <Card style={ {margin: "5px", minWidth:"200px"} }>
            <List >
              <ListItem>
                <Typography variant="body2" color="textSecondary" component="p"> { "Cart" } </Typography>
              </ListItem>
            </List>
            <Divider />
            <List >
              { this.state.menu.map( (o) => this.cartCard(o) ) }
            </List>
            <Divider />
            <CardActions disableSpacing style={{ position: "absolute", bottom: "10px" }}>
              { "Total: $"+(this.state.menu.reduce( (a, b) => { if (b.count>0) return a+b.price*b.count; else return a; }, 0 )).toFixed(2) }
              <Button>{ "Order" }</Button>
            </CardActions>
          </Card>
        </Grid>
      </Container>
    );
  }
}

export default Food;
