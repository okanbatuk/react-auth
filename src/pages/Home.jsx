import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import api from "../libs/api";

const LOGOUT_URL = "/logout";

const Home = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = async () => {
    // if used in more components, this should be in context
    // axios to /logout endpoint
    try {
      const response = await api.get(LOGOUT_URL);
      console.log(response);
      setAuth({});
      navigate("/linkpage");
    } catch (err) {
      !err?.response
        ? console.log("There is No Server Response")
        : console.log(err.response.data.message);
    }
  };

  return (
    <section>
      <h1>Home</h1>
      <br />
      <p>You are logged in!</p>
      <br />
      <Link to="/admin">Go to the Admin page</Link>
      <br />
      <Link to="/linkpage">Go to the link page</Link>
      <div className="flexGrow">
        <button onClick={logout}>Sign Out</button>
      </div>
    </section>
  );
};

export default Home;
