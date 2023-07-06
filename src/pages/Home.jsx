import { useNavigate, Link, useLocation } from "react-router-dom";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAuth from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";
import "../assets/homePage.css";

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
      <div className="row">
        <div className="column-main">
          <h1>Home</h1>
        </div>
        <div className="column-other">
          <FontAwesomeIcon
            icon={faUser}
            size="2xl"
            className="userIcon"
            onClick={() => navigate("update")}
          />
        </div>
      </div>
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
