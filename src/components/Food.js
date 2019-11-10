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

class Food extends Component {
  constructor() {
    super();
    this.state = {
      menu: [ {
        "name": "testDish",
        "desc": "Teasty dish. Prepeared with care and effort.",
        "price": 10.0,
        "": "",
      },
      {
        "name": "testDish",
        "desc": "Teasty dish. Prepeared with care and effort.",
        "price": 10.0,
        "": "",
      },
      {
        "name": "testDish",
        "desc": "Teasty dish. Prepeared with care and effort.",
        "price": 10.0,
        "": "",
      },
      {
        "name": "testDish",
        "desc": "Teasty dish. Prepeared with care and effort.",
        "price": 10.0,
        "": "",
      },
      {
        "name": "testDish",
        "desc": "Teasty dish. Prepeared with care and effort.",
        "price": 10.0,
        "": "",
      },
      {
        "name": "testDish",
        "desc": "Teasty dish. Prepeared with care and effort.",
        "price": 10.0,
        "": "",
      },
      {
        "name": "testDish",
        "desc": "Teasty dish. Prepeared with care and effort.",
        "price": 10.0,
        "": "",
      },
      {
        "name": "testDish",
        "desc": "Teasty dish. Prepeared with care and effort.",
        "price": 10.0,
        "": "",
      } ]
    };
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  foodCard( name, description, price ) {
    return (

      <Card style={ {maxWidth: "275px", margin: "5px"} }>
        <CardHeader
          title={ name }
        />
        <img src={ require("../images/test.jpg") }/>
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
        <div style={{ display:"flex", flexFlow: "row wrap" }}>{ this.state.menu.map( (o) => this.foodCard(o.name, o.desc, o.price ) ) }</div>
      </div>
    );
  }
}

export default Food;
