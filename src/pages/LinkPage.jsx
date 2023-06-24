import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const LinkPage = () => {
  const { state } = useLocation();
  return (
    <section>
      <h1>Links</h1>
      {state && (
        <p>
          {state?.message}..
          <FontAwesomeIcon icon={faCheck} className="valid" />
        </p>
      )}
      <br />
      <h2>Public</h2>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <br />
      <h2>Private</h2>
      <Link to="/">Home</Link>
      <Link to="/admin">Admin Page</Link>
    </section>
  );
};

export default LinkPage;
