import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

import { 
  ButtonBase,
  Grid,
  Container, Typography, 
  Paper
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    height: 200,
    width: 250
  },
  control: {
    padding: theme.spacing(2)
  }
}));

function fancy(){
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
  )
}

export default function SpacingGrid() {
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      justify="space-evenly"
      alignItems="center"
      className={classes.root}
      spacing={2}
    >
      <Grid item xs={12}>
        <Grid container align="center" justify="center" spacing={spacing}>
          <Grid item>
            <Paper className={classes.paper}>
              <Link to="/amenities" className="nav-link">
                Amenities
              </Link>
            </Paper>
          </Grid>
          <Grid item>
            <Paper className={classes.paper}>
              <Link to="/food" className="nav-link">
                Buffet
              </Link>
            </Paper>
          </Grid>
          <Grid item>
            <Paper className={classes.paper}>
              <Link to="/valet" className="nav-link">
                Valet
              </Link>
            </Paper>
          </Grid>
          <Grid item>
            <Paper className={classes.paper}>
              <Link to="/shuttle" className="nav-link">
                Shuttle
              </Link>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
