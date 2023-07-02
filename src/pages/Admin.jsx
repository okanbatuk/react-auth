import { Link, Navigate, useLocation } from "react-router-dom";
import jwtDecode from "jwt-decode";
import useAuth from "../hooks/useAuth";
import Users from "../pages/Users";

const Admin = () => {
  const { auth } = useAuth();
  const location = useLocation();

  const decoded = auth?.accessToken ? jwtDecode(auth.accessToken) : undefined;

  return decoded.roles === "admin" ? (
    <section>
      <h1>Admins Page</h1>
      <br />
      <div style={{ marginLeft: "1rem" }}>
        <Users />
      </div>
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
