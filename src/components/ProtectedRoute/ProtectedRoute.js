import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, userData, ...rest }) => {

  return (
    <Route {...rest} render={
      props => {
        if (userData.user !== null) {
          return <Component {...rest} {...props} />;
        } else {
          return <Redirect to={
            {
              pathname: '/',
              state: {
                from: props.location
              }
            }
          } />;
        }
      }
    } />
  );
};

export default ProtectedRoute;