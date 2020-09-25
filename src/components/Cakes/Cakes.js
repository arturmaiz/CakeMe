import React, { useContext, useEffect } from "react";

import Container from "@material-ui/core/Container";

import NavBar from "../NavBar/NavBar";
import Cake from "./Cake/Cake";

import { CakesContext } from "../../context/cakes/cakesContext";

const Cakes = () => {
  const { cakes, getCakes } = useContext(CakesContext);

  useEffect(() => {
    getCakes();
  }, []);

  return (
    <>
      <NavBar></NavBar>
      <Container maxWidth="sm">
        {cakes.map((cake) => (
          <Cake key={cake._id} cake={cake} />
        ))}
      </Container>
    </>
  );
};

export default Cakes;
