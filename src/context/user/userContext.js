import React, { createContext, useReducer, useEffect } from "react";
import { withRouter } from "react-router";
import axios from "axios";
import UserReducer from "./UserReducer";
import { IS_VALID, NOT_VALID, SET_USER_DATA } from "../types";

const initialState = {
  token: localStorage.getItem("token"),
  user: null,
  error: null,
  loading: true,
  isAuthentecated: false,
};

export const UserContext = createContext(initialState);

const UserProvider = ({ children, history }) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);

  useEffect(() => {
    const checkLoggedIn = async () => {
      if (state.token === null) {
        localStorage.setItem("token", "");
        state.token = "";
      }

      try {
        const tokenRes = await axios.post("/users/tokenIsValid", null, {
          headers: {
            "x-auth-token": state.token,
          },
        });

        if (tokenRes.data) {
          try {
            const userRes = await axios.get("/users", {
              headers: { "x-auth-token": state.token },
            });

            dispatch({
              type: IS_VALID,
              payload: { user: userRes.data, token: state.token },
            });

            setUserData({ user: userRes.data, token: state.token });
          } catch (err) {
            notValid(err);
            console.log(err);
          }
        }
        history.location.pathname();
      } catch (err) {
        return err;
      }
    };

    checkLoggedIn();
  }, [history, state.token]);

  const notValid = (error) => {
    dispatch({
      type: NOT_VALID,
      payload: error,
    });
  };

  const setUserData = ({ user, token }) => {
    dispatch({
      type: SET_USER_DATA,
      payload: { user, token },
    });
  };

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        token: state.token,
        loading: state.loading,
        error: state.error,
        isAuthentecated: state.isAuthentecated,
        setUserData,
        notValid,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default withRouter(UserProvider);
