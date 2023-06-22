import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Form from "../components/loginForm";
import "../assets/loginForm.css";

export default () => {
  const errRef = useRef();
  const [err, setErr] = useState("");

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
