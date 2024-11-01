import React, { createContext, useState, useContext } from "react";

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");

  const handleLogin = (isLoggedin, username, userId) => {
    setAuthenticated(isLoggedin);
    setUserId(userId);
    setUsername(username);
  };

  return (
    <LoginContext.Provider
      value={{
        authenticated,
        username,
        userId,
        handleLogin,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);
