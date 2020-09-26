import React, { useContext, useEffect } from "react";

import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import NavBar from "../NavBar/NavBar";
import Cake from "./Cake/Cake";

import { CakesContext } from "../../context/cakes/cakesContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

const Cakes = () => {
  const { cakes, getCakes } = useContext(CakesContext);
  const classes = useStyles();

  useEffect(() => {
    getCakes();
  }, [getCakes]);

  return (
    <>
      <NavBar></NavBar>
      <Grid container justify="center" className={classes.root} spacing={2}>
        {cakes.map((cake) => (
          <Cake key={cake._id} cake={cake} />
        ))}
      </Grid>
    </>
  );
};

export default Cakes;
