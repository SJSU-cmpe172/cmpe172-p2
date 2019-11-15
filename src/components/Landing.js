import React, { Component } from "react";
import { 
  ButtonBase,
  Card, CardHeader , CardMedia, CardContent, CardActions, 
  Grid,
  Container, Typography
} from '@material-ui/core';

class Landing extends Component {
  render() {
    return (
      <Container style={{padding: "0px", margin: "0px", width: "100%"}}>
        <ButtonBase
          focusRipple
          key={"food"}
          className={"name"}
          style={{
            width: "100%",
          }}
          href="/food"
        >
          <img src={ "https://i.imgur.com/PrMCLUh.jpg" } style={{height:'200px', width: "100%"}}/>
          <span style={{backgroundColor: "#000000", opacity: 0.4,}}/>
          <Typography
            component="span"
            variant="h1"
            color="inherit"
            style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: "#FFFFFF",}}
          >
            {"Buffet"}
          </Typography>
        </ButtonBase>
      </Container>
    );
  }
}

export default Landing;
