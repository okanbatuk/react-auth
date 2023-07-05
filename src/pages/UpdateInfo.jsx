import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from "../components/updateForm";
import useAuth from "../hooks/useAuth";
import useFetchPrivate from "../hooks/useFetchPrivate";
import "../assets/updateForm.css";

export default () => {
  const { auth } = useAuth();
  const notRef = useRef();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
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
      {message && (
        <p
          className={message?.err ? "errmsg" : "sucessmsg"}
          ref={notRef}
          aria-live="assertive"
        >
          {message.content}
        </p>
      )}
      <div className="row">
        <div className="main-column">
          <h1>Update Profile</h1>
        </div>
        <div className="other-column">
          <i onClick={() => navigate("password")}>
            <FontAwesomeIcon
              icon={faLock}
              size="xl"
              className="pwdIcon"
              data-info="Change Password"
            />
          </i>
        </div>
      </div>
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
