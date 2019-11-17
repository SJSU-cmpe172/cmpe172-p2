import React from "react";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
});

export default function ItemCard(props) {
  const classes = useStyles();

  const onClick = e => {
    e.preventDefault();
    props.updateList(props.itemName);
  };

  return (
    <Card classNme={classes.card}>
      <CardMedia className={classes.media} image={props.itemImage} />
      <CardContent>
        <Typography gutterBottom variant="h5">
          {props.itemName}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={onClick} size="small" color="primary">
          Add
        </Button>
      </CardActions>
    </Card>
  );
}
