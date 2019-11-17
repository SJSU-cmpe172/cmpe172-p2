// This is a food service page for hotel clients.
// User gets here from homepage by selecting a food service
import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import { 
  Button,
  Card, CardHeader, CardContent, CardActions, 
  Container, Grid,
  List, ListItem, Divider,
  Snackbar,
  Avatar, IconButton, Typography
} from '@material-ui/core';
import { 
  FavoriteIcon, ShoppingCart, Delete, Close
} from '@material-ui/icons'; 
import { createJob } from './JobFunctions';
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
      menu:            [],
      cartPrice:        0,
      room:            "",
      confirmSnack: false,
      cancel:       false,
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
      room: storage.roomNum,
    });
    console.log(this.cartIsEmpty());
  } 
  makeJob() {
    this.setState({ confirmSnack: true, menu: this.state.menu.map( (o)=>{return Object.assign(o, {count: 0})} ) });  // Clear the cart
    // Give user some time to cancel
    setTimeout( ()=>{
      if (!this.state.cancel) {
        const id = Date.now();
        createJob({
          id:                id,
          room: this.state.room,
          type:          "food",
          //job specific
          items: this.state.menu.filter( (f) => { if (f.count>0) return { foodID: f.name, count: f.count }} ),
        });
      }
      else { console.log('canceled'); this.setState({cancel: false}) }
      this.setState( { confirmSnack: false } )
    }, 4000 );
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
  cartIsEmpty() {
    return !this.state.menu.reduce( (m,n) => { return ( n.count > 0 || m ) }, false ); 
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
  confirmOrderSnack() {
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={ this.state.confirmSnack }
        onClose={ (e) => { this.setState( { confirmSnack: false } ) } }
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        style={{maxWidth: 600}}
        message={<span id="message-id">Your order is being processed!</span>}
        action={[
          <Button key="undo" color="secondary" size="small" onClick={ (e) => this.setState({ cancel: true, confirmSnack: false }) }>
            CANCEL
          </Button>,
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            onClick={ (e) => {this.setState({confirmSnack: false})} }
          >
            <Close />
          </IconButton>,
        ]}
      />
    )
  }
  render() {
    return (
      <Container style={{ display:"flex" }}>
        <Grid direction='column' xs={10} style={{ display:"flex", flexFlow: "row wrap" }}>
          { this.confirmOrderSnack() }
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
              {/* Disable order button if no items are added to cart */}
              <Button 
                disabled={ this.cartIsEmpty() } 
                onClick={ () => this.makeJob() }>{ "Order" }</Button>
            </CardActions>
          </Card>
        </Grid>
      </Container>
    );
  }
}

export default Food;
