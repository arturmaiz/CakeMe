import React, { useContext, useEffect } from "react";
import { withRouter } from "react-router-dom";

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
    marginBottom: "50px",
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

const NavBar = ({ history }) => {
  const { token, setUserData, error } = useContext(UserContext);
  const classes = useStyles();

  useEffect(() => {
    error === "Token Is Not Valid 🤨 Please Login Again" &&
      history.push("/login");
  }, [error, history]);

  const handleLogOut = () => {
    setUserData({
      token: null,
      user: null,
    });

    history.push("/login");
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Button color="inherit" href="/">
              Cake Me 🍰
            </Button>
          </Typography>
          {!token && (
            <>
              <Button color="inherit">Login</Button>
              <Button color="inherit">Signup</Button>
            </>
          )}
          <Button color="inherit" onClick={handleLogOut}>
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

export default withRouter(NavBar);
