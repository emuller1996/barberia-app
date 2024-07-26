import { createContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import PropTypes from "prop-types";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
  const [tokenAccess] = useLocalStorage("tokenAccess", null);

  const [token, setToken] = useState(tokenAccess ? tokenAccess : null);
  const [User, setUser] = useState(null);

  let contextData = {
    token,
    setToken,
    setUser,
    User,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};