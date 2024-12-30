import { useContext } from "react";
import { AuthContext } from "./provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "./components/Loading";
import PropTypes from "prop-types";

export default function PrivateRoute({ children }) {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  if (loading) return <Loading />;
  if (user && user?.email) {
    return children;
  }
  return <Navigate state={location.pathname} to="/login"></Navigate>;
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
