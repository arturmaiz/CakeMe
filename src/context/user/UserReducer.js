import { IS_VALID, NOT_VALID, SET_USER_DATA } from "../types";

export default (state, action) => {
  switch (action.type) {
    case IS_VALID:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        isAuthentecated: true,
        token: action.payload.token,
      };
    case NOT_VALID:
      return {
        ...state,
        loading: false,
        isAuthentecated: false,
        token: null,
        error: action.payload.response.data.msg,
      };
    case SET_USER_DATA:
      return {
        loading: false,
        user: action.payload.user,
        token: action.payload.token,
      };
    default:
      return state;
  }
};
