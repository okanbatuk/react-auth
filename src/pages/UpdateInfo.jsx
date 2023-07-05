import React, { useEffect, useRef, useState } from "react";
import Form from "../components/updateForm";
import useAuth from "../hooks/useAuth";
import useFetchPrivate from "../hooks/useFetchPrivate";
import "../assets/updateForm.css";

export default () => {
  const { auth } = useAuth();
  const notRef = useRef();
  const [message, setMessage] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const { data, loading, error } = useFetchPrivate(
    `/users/${auth?.user?.uuid}`
  );

  useEffect(() => {
    // State changed to null after set the error
    window.history.replaceState({}, document.title);
  }, []);

  useEffect(() => {
    const userInfo = data?.data?.user[0];
    userInfo && setUserInfo(userInfo);
  }, [data]);

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
        <Form
          userInfo={userInfo}
          message={message}
          setMessage={setMessage}
          notRef={notRef}
        />
      )}
    </section>
  );
};
