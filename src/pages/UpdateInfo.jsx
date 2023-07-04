import React, { useEffect, useRef, useState } from "react";
import Form from "../components/updateForm";
import useFetchUser from "../hooks/useFetchUser";
import useAuth from "../hooks/useAuth";
import "../assets/updateForm.css";

export default () => {
  const { auth } = useAuth();
  const notRef = useRef();
  const [message, setMessage] = useState({});
  const { data, loading, error } = useFetchUser(`/users/${auth?.user?.uuid}`);

  useEffect(() => {
    // State changed to null after set the error
    window.history.replaceState({}, document.title);
  }, []);

  useEffect(() => {
    error && setMessage({ err: true, content: error });
  }, [error]);

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
      <h1>Update Profile</h1>
      {loading ? (
        <p>Loading..</p>
      ) : (
        <Form data={data} setMessage={setMessage} notRef={notRef} />
      )}
    </section>
  );
};
