import React, { useRef, useState } from "react";
import Form from "../components/loginForm";
import "../assets/loginForm.css";

export default () => {
  const errRef = useRef();
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState("");

  return (
    <>
      {success ? (
        <section>
          <h1>You are logged in!</h1>
          <br />
          <p>
            <a href="#"> Go to Home</a>
          </p>
        </section>
      ) : (
        <section>
          <p
            className={err ? "errmsg" : "offscreen"}
            ref={errRef}
            aria-live="assertive"
          >
            {err}
          </p>
          <Form setSuccess={setSuccess} setErr={setErr} errRef={errRef} />
        </section>
      )}
    </>
  );
};
