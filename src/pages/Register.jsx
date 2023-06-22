import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Form from "../components/registerForm";
import "../assets/registerForm.css";

export default () => {
  const errRef = useRef();
  const [error, setError] = useState("");

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
