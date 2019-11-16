// This is a food service page for hotel clients.
// User gets here from homepage by selecting a food service
import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import { 
  Button,
  Card, CardHeader, CardContent, CardActions, 
  Divider,
  Grid,
  List, ListItem,
  Container, Avatar, IconButton, Typography
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
      room: "",
    };
  }
  componentDidMount = async () => {
    let res = await get('menu');
    console.log(res);
    const token   = localStorage.usertoken;
    console.log('token', token);
    const storage = jwt_decode(token);
    console.log('storgae', storage);
    this.setState( { 
      menu: res.map( (r) => {
        return {
          name:  r.itemName, 
          desc:  r.itemDescr, 
          price: r.itemPrice, 
          image: r.itemUrl,
          count: 0 }
        }),
      room: storage.room,
    });
  } 
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  makeJob() {
    const jobId = Date.now();
    axios.post("/api/jobs/create", {
      id:               jobId,
      room: this.state.roomID,
      type:            "food",
      status:               0,
      dtCreated:   Date.now(),
      dtWorked:             0,
      dtCompleted:      false,
      staff:             null,
      //job specific
      items: this.state.cart.map( (f) => {return { foodID: f.name, count: f.count }} ),
      dtPickup:    null,    //shuttle
      destination: null,    //shuttle
      ticketNo:    null     //valet
    });
  }
  addToCart( food ) {
    const new_food = Object.assign(food, {count: food.count+1});
    const new_menu = this.state.menu.map( (o) => {if (o.name!==food.name) return o; else return new_food} );
    this.setState( {menu: new_menu} );
  }
  removeFromCart( food ) {
    let new_menu = this.state.menu.map((o) => {
      if (o.name===food.name) return { name:food.name, desc:food.desc, price:food.price, image:food.image, count:food.count-1 };
      else return o;
    });
    this.setState( {menu: new_menu } );
  }
  cartCard( food ) {
    if ( food.count > 0) {
      return(
        <ListItem>
          <Typography variant="body2" color="textSecondary" component="p"> { food.name+` x${food.count} ` } </Typography>
          <Typography variant="body2" color="textSecondary" component="p" > { "$"+(food.count*food.price).toFixed(2) } </Typography>
          <IconButton aria-label="add to cart" onClick={ () => this.removeFromCart(food) }>
            <Delete />
          </IconButton>
        </ListItem>
      )
    }
    else { return null}
  }
  foodCard( {name,desc,price,image,count} ) {
    return (
      <Card style={ {maxWidth: "275px", margin: "5px"} }>
        <CardHeader
          title={ name }
        />
        <img src={ image } style={{height:'185px', width: "275px"}}/>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p"> { desc } </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to cart" onClick={ () => this.addToCart({name,desc,price,image,count}) }>
            <ShoppingCart />
          </IconButton>
          <Typography variant="body2" color="textSecondary" component="p" > { "$"+price.toFixed(2) } </Typography>
        </CardActions>
      </Card>
    );
  }
  render() {
    return (
      <Container style={{ display:"flex" }}>  
        <Grid direction='column' xs={10} style={{ display:"flex", flexFlow: "row wrap" }}>
          { this.state.menu.map( (o) => this.foodCard(o) ) }
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
