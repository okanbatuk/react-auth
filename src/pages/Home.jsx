import { useNavigate, Link, useLocation } from "react-router-dom";
import api from "../libs/api";
import useAuth from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";

const Home = () => {
  const { auth } = useAuth();
  const logout = useLogout();
  const navigate = useNavigate();
  const { state } = useLocation();

  const signOut = async () => {
    // if used in more components, this should be in context
    await logout();
    navigate("/linkpage", { state: { message: "Logged out successfully.." } });
  };

  return (
    <section>
      <h1>Home</h1>

      <p>
        Hello, {auth.user.firstName} {auth.user.lastName} <br />
        {state && state?.message}
      </p>
      <br />
      <Link to="/admin">Go to the Admin page</Link>
      <br />
      <Link to="/linkpage">Go to the link page</Link>
      <div className="flexGrow">
        <button onClick={signOut}>Sign Out</button>
      </div>
    </section>
  );
};

export default Home;
