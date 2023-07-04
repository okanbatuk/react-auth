import React, { useEffect, useRef, useState } from "react";
import Form from "../components/updateForm";

export default () => {
  const notRef = useRef();
  const [message, setMessage] = useState({});

  return (
    <section>
      <p
        className={
          message ? (message?.err ? "errmsg" : "sucessmsg") : "offscreen"
        }
        ref={notRef}
        aria-live="assertive"
      >
        {message.content}
      </p>
      <h1>Update your profile information</h1>
      <Form setMessage={setMessage} notRef={notRef} />
    </section>
  );
};
