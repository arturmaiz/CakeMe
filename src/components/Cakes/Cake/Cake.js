import React from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const Cake = ({ cake }) => {
  const classes = useStyles();

  const hendleDate = () => {
    let date = new Date(cake.createdAt);

    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  return (
    <Card className={classes.root}>
      <Link to={`/cake/${cake._id}`}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {`$${cake.price}`}
            </Avatar>
          }
          title={cake.name}
          subheader={hendleDate()}
        />
      </Link>
      <CardMedia
        className={classes.media}
        image={cake.image}
        title={cake.name}
      />
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <AddShoppingCartIcon />
        </IconButton>
        <IconButton aria-label="share">
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Cake;
