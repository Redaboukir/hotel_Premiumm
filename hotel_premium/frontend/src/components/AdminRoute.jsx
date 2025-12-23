import { Navigate } from "react-router-dom";
import { isAdmin } from "../services/auth";

function AdminRoute({ children }) {
  if (!isAdmin()) {
    return <Navigate to="/hotels" replace />;
  }

  return children;
}

export default AdminRoute;
