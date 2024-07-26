import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useNavigate } from "react-router";
import AuthContext from "../../context/AuthContext";
import Spinner from "../../components/_Spiner";
import { getUserService } from "../../services/auth.services";

export default function RouteProtected({ children }) {
  const { token, setUser, setToken } = useContext(AuthContext);
  const [isLoading, setisLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      setisLoading(true);
      await getUserService(token);
      setisLoading(false);
    } catch (error) {
      if (
        error?.response?.status === 401 ||
        error?.response?.status === 403 ||
        error?.response?.status === 405
      ) {
        navigate("/login");
        setUser(null);
        setToken(null);
        localStorage.removeItem("tokenAccess");
      }
      setisLoading(false);
    }
  };
  if (isLoading) {
    return <Spinner />;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
RouteProtected.propTypes = {
  children: PropTypes.node.isRequired,
};
