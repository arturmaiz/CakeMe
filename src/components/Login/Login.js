import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import Header from "../Header/Header";

import { UserContext } from "../../context/user/userContext";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "grid",
    placeItems: "center",
  },
  paper: {
    maxWidth: "80%",
    display: "grid",
    placeItems: "center",
    padding: theme.spacing(4),
    position: "relative",
    top: "-88px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  title: {
    color: "#1F2041",
  },
  signup: {
    display: "flex",
    width: "100%",
  },
}));

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const classes = useStyles();
  const { setUserData, error, token, notValid } = useContext(UserContext);

  useEffect(() => {
    token ? props.history.push("/") : props.history.push("/login");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const loginRes = await axios.post("/users/login", {
        email,
        password,
      });

      localStorage.setItem("token", loginRes.data.token);

      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });

      props.history.push("/");
    } catch (err) {
      notValid(err);
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <Container className={classes.root}>
        <Paper elevation={3} className={classes.paper}>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Typography className={classes.title} variant="h4" gutterBottom>
              Login
            </Typography>
            <TextField
              className={classes.input}
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              label="Email"
              variant="outlined"
              required
            />
            <TextField
              className={classes.input}
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              label="Password"
              variant="outlined"
              required
            />
            <Button
              className={classes.button}
              type="submit"
              variant="contained"
              color="primary"
            >
              Login
            </Button>
          </form>

          <div className={classes.signup}>
            <Button variant="outlined" color="primary" href="/signup">
              Signup
            </Button>
          </div>
        </Paper>
        {error && (
          <Typography className={classes.title} variant="h4" gutterBottom>
            {error}
          </Typography>
        )}
      </Container>
    </>
  );
};

export default Login;
