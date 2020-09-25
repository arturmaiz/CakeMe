import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem("token");

  return (
    <Route
      {...rest}
      render={(props) =>
        token && token !== "" ? (
          <Component {...rest} {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: {
                from: props.location,
              },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
