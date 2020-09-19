import React, { createContext, useReducer, useEffect } from "react";
import { withRouter } from "react-router";
import axios from "axios";
import UserReducer from "./UserReducer";
import { IS_VALID, SET_USER_DATA } from "../types";

const initialState = {
  token: localStorage.getItem("token"),
  user: null,
  error: null,
  loading: true,
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

      const tokenRes = await axios.post("/users/tokenIsValid", null, {
        headers: {
          "x-auth-token": state.token,
        },
      });

      if (tokenRes.data) {
        const userRes = await axios.get("/users", {
          headers: { "x-auth-token": state.token },
        });

        dispatch({
          type: IS_VALID,
          payload: { user: userRes.data, token: state.token },
        });

        history.push("/");
      }
    };

    checkLoggedIn();
  }, [state.token, history]);

  const setUserData = (user, token) => {
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
        setUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default withRouter(UserProvider);
