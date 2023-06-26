import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Form from "../components/loginForm";
import "../assets/loginForm.css";
import useAuth from "../hooks/useAuth";

export default () => {
  const { auth } = useAuth();
  const errRef = useRef();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [err, setErr] = useState("");

  useEffect(() => {
    auth?.accessToken &&
      navigate("/", { state: { message: "You have already logged in." } });
  }, []);

  useEffect(() => {
    state?.message && setErr(state.message) && errRef.current.focus();
  }, [state?.message]);

  return (
    <section>
      <p
        className={err ? "errmsg" : "offscreen"}
        ref={errRef}
        aria-live="assertive"
      >
        {err}
      </p>
      <h1>Sign In</h1>
      <Form setErr={setErr} errRef={errRef} />
      <p>
        Need an Account <br />
        <span className="line">
          <Link to="/register">Sign Up</Link>
        </span>
      </p>
    </section>
  );
};
