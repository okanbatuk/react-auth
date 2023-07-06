import React, { useRef, useState } from "react";
import Form from "../components/updatePwdForm";
import "../assets/updatePwdForm.css";

export default () => {
  const notRef = useRef();
  const [message, setMessage] = useState(null);

  return (
    <section>
      {message && (
        <p
          className={message.err ? "errmsg" : "sucessmsg"}
          ref={notRef}
          aria-live="assertive"
        >
          {message.content}
        </p>
      )}
      <h1>Update Password</h1>
      <Form message={message} setMessage={setMessage} notRef={notRef} />
    </section>
  );
};
