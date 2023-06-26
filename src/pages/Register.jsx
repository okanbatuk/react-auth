import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "../components/registerForm";
import "../assets/registerForm.css";
import useAuth from "../hooks/useAuth";

export default () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const errRef = useRef();
  const [error, setError] = useState("");

  useEffect(() => {
    auth?.accessToken &&
      navigate("/", {
        state: { message: "Please log out before going to Register Page." },
      });
  }, []);

  return (
    <section>
      <p
        ref={errRef}
        className={error ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {error}
      </p>
      <h1>Register</h1>
      <Form setError={setError} errRef={errRef} />
      <p>
        Already registered?
        <br />
        <span className="line">
          {/*put router link here*/}
          <Link to="/login">Sign In</Link>
        </span>
      </p>
    </section>
  );
};
