import React, { useEffect, useRef, useState } from "react";
import "../assets/loginForm.css";
import Form from "../components/loginForm";

export default () => {
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
          <p className={err ? "errmsg" : "offscreen"} aria-live="assertive">
            {err}
          </p>
          <Form setSuccess={setSuccess} setErr={setErr} />
        </section>
      )}
    </>
  );
};
