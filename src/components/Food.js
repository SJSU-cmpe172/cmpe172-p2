import React, { Component } from "react";
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Card, CardHeader , CardMedia, CardContent, CardActions, 
  Grid, Row, Column,
  Container, Collapse, Avatar, IconButton, Typography, red
} from '@material-ui/core';
import { 
  FavoriteIcon, ShoppingCart, ExpandMoreIcon, MoreVertIcon
} from '@material-ui/icons'; 
import { async } from "q";

const imgs = {
  default:    require("../images/test.jpg"),
  img_burger: require("../images/test.jpg"),
  img_salad:  require("../images/salad.jpg"),
  img_coke:   require("../images/coke.jpg"),
  img_fries:  require("../images/fries.jpg"),
}

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
      menu: [ {
        name: "testDish",
        desc: "Teasty dish. Prepeared with care and effort.",
        price: 10.0,
        image: imgs.default,
      } ]
    };
  }
  componentDidMount = async () => {
    let res = await get('menu');
    console.log(res);
    this.setState( { menu: res.map( (r) => {
      let img = null;
      if ( r.itemUrl in imgs ) { img=imgs[r.itemUrl] } else { img=imgs.default }
      console.log(img);
      return {
        name: r.itemName, 
        desc: r.itemDescr, 
        price: r.itemPrice, 
        image: img }
      })} );
  } 
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  foodCard( name, description, price, image ) {
    return (
      <Card style={ {maxWidth: "275px", margin: "5px"} }>
        <CardHeader
          title={ name }
        />
        <img src={ image } style={{height:'185px', width: "275px"}}/>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p"> { description } </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to cart">
            <ShoppingCart />
          </IconButton>
          <Typography variant="body2" color="textSecondary" component="p" > { "$"+price.toFixed(2) } </Typography>
        </CardActions>
      </Card>
    );
  }
  render() {
    return (
      <div>
        <div style={{ display:"flex", flexFlow: "row wrap" }}>{ this.state.menu.map( (o) => this.foodCard(o.name, o.desc, o.price, o.image ) ) }</div>
      </div>
    );
  }
}

export default Food;
