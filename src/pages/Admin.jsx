import { Link, Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Users from "../pages/Users";

const Admin = () => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.roles === "admin" ? (
    <section>
      <h1>Admins Page</h1>
      <br />
      <Users />
      <br />
      <div className="flexGrow">
        <Link to="/">Home</Link>
      </div>
    </section>
  ) : (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  );
};

export default Admin;
