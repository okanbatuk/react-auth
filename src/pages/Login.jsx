import React, { useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Form from "../components/loginForm";
import "../assets/loginForm.css";

export default () => {
  const { setAuth } = useAuth();
  const errRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();

  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState("");

  const from = location.state?.from?.pathname || "/";

  (() => {
    success && navigate(from, { replace: true });
  })();

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
      <Form setSuccess={setSuccess} setErr={setErr} errRef={errRef} />
      <p>
        Need an Account <br />
        <span className="line">
          <Link to="/register">Sign Up</Link>
        </span>
      </p>
    </section>
  );
};
