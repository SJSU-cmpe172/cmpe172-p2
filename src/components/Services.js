import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";

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

export default function SpacingGrid() {
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();

  const handleChange = event => {
    setSpacing(Number(event.target.value));
  };

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
              <Link to="/profile" className="nav-link">
                Profile
              </Link>
            </Paper>
          </Grid>
          <Grid item>
            <Paper className={classes.paper}>
              <Link to="/profile" className="nav-link">
                Profile
              </Link>
            </Paper>
          </Grid>
          <Grid item>
            <Paper className={classes.paper}>
              <Link to="/profile" className="nav-link">
                Profile
              </Link>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
