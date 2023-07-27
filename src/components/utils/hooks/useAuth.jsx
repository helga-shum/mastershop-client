import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Loading from "../../ui/loading";
import localStorageService from "../../services/localStorageService";
import UserService from "../../services/userService";
import { useNavigate } from "react-router-dom";

import config from "../../../../config.json";

export const httpAuth = axios.create({
  baseURL: config.apiEndpoint + "auth/",
  params: {
    key: import.meta.env.VITE_REACT_APP_FIREBASE_KEY,
  },
});

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [currentUser, setUser] = useState();
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [isUserUpdated, setIsUserUpdated] = useState(false);

  async function signUp({
    userName,
    phone,
    email,
    address,
    password,
    licence,
  }) {
    try {
      const { data } = await httpAuth.post("signUp", {
        userName,
        phone,
        email,
        address,
        password,
        licence,
        returnSecureToken: true,
      });

      localStorageService.setTokens(data);
      //await createUser({
      //  id: data.userId,
      //  email,
      //  ...rest,
      //});
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;

      if (code === 400) {
        if (message === "EMAIL_EXISTS") {
          const errorObject = {
            email: "User with this Email already exists",
          };
          throw errorObject;
        }
      }
    }
  }

  async function logIn({ email, password }) {
    try {
      const { data } = await httpAuth.post("signInWithPassword", {
        email,
        password,
        returnSecureToken: true,
      });
      localStorageService.setTokens(data);
      await getUserData();
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;

      if (code === 400) {
        switch (message) {
          case "INVALID_PASSWORD":
            throw new Error("Email or password entered incorrectly");
          default:
            throw new Error("Too many login attempts. try later");
        }
      }
    }
  }

  function logOut() {
    localStorageService.removeAuthData();
    setUser(null);
    navigate("/");
  }

  async function createUser(data) {
    try {
      const { content } = await UserService.create(data);
      setUser(content);
    } catch (error) {
      errorCatcher(error);
    }
  }

  async function getUserData() {
    try {
      const { content } = await UserService.getCurrentUser();
      setUser(content);
    } catch (error) {
      errorCatcher(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    if (localStorageService.getAccessToken()) {
      getUserData();
    } else {
      setLoading(false);
    }
  }, [isUserUpdated]);

  async function updateUserData(data) {
    try {
      const { content } = await UserService.updateCurrentUser(data);
      setUser(content);
      setIsUserUpdated(!isUserUpdated);
    } catch (error) {
      errorCatcher(error);
    }
  }

  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
  }
  useEffect(() => {
    if (error !== null) {
      setError(null);
    }
  }, [error]);

  return (
    <AuthContext.Provider
      value={{
        signUp,
        logIn,
        logOut,
        currentUser,
        updateUserData,
      }}
    >
      {!isLoading ? children : <Loading />}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
export default AuthProvider;
