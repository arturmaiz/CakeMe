import React, { useContext } from "react";

import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import { UserContext } from "../../context/user/userContext";

import "./NavBar.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  badgeBtn: {
    marginLeft: theme.spacing(1),
  },
}));

const NavBar = () => {
  const { user, setUserData } = useContext(UserContext);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Button color="inherit" href="/">
              Cake Me 🍰
            </Button>
          </Typography>
          {!user && (
            <>
              <Button color="inherit">Login</Button>
              <Button color="inherit">Signup</Button>
            </>
          )}
          <Button
            color="inherit"
            onClick={() =>
              setUserData({
                token: null,
                user: null,
              })
            }
          >
            Logout
          </Button>
          <IconButton
            edge="start"
            className={classes.badgeBtn}
            color="inherit"
            aria-label="menu"
          >
            <Badge
              overlap="circle"
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              badgeContent={<Typography variant="h6">1</Typography>}
            >
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
