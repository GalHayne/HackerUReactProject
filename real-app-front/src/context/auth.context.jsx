import { createContext, useContext, useReducer, useState } from "react";
import usersService from "../services/usersService";

const fn_error_context_must_be_used = () => {
  throw new Error(
    "must use authContext provider for consumer to work properly"
  );
};

export const authContext = createContext({
  logout: fn_error_context_must_be_used,
  login: fn_error_context_must_be_used,
  createUser: fn_error_context_must_be_used,
  user: null,
});
authContext.displayName = "auth";

const initialState = {
  user: usersService.getUser(),
  isAuthenticating: false,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "AUTHENTICATING":
      return { ...state, isAuthenticating: true, user: null, error: null };

    case "AUTHENTICATED":
      return { ...state, isAuthenticating: false, user: action.payload };

    case "UNAUTHORIZED":
      return { ...state, error: action.payload };

    case "LOGOUT":
      return { ...state, isAuthenticating: false, user: null, error: null };

    default:
      throw new Error("Unknown Action");
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = async (credentials) => {
    dispatch({
      type: "AUTHENTICATING",
    });

    let response;
    try {
      response = await usersService.loginUser(credentials);
      dispatch({ type: "AUTHENTICATED", payload: usersService.getUser() });
    } catch (err) {
      if (err.response && err.response.status === 400) {
        dispatch({
          type: "UNAUTHORIZED",
          payload: err.response.data,
        });
      }
    }

    return response;
  };

  const logout = () => {
    usersService.logout();
    dispatch({ type: "LOGOUT" });
  };

  return (
    <authContext.Provider
      value={{
        ...state,
        logout,
        login,
        createUser: usersService.createUser,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(authContext);
};

export default AuthProvider;
