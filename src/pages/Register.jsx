import React, { useRef, useState, useEffect } from "react";
import Form from "../components/registerForm";
import "../assets/registerForm.css";

export default () => {
  const errRef = useRef();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <a href="#">Sign In</a>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={error ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {error}
          </p>
          <h1>Register</h1>
          <Form setSuccess={setSuccess} setError={setError} errRef={errRef} />
          <p>
            Already registered?
            <br />
            <span className="line">
              {/*put router link here*/}
              <a href="#">Sign In</a>
            </span>
          </p>
        </section>
      )}
    </>
  );
};
