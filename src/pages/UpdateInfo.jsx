import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  faLock,
  faUserMinus,
  faCheck,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from "../components/updateForm";
import useAuth from "../hooks/useAuth";
import useFetchPrivate from "../hooks/useFetchPrivate";
import "../assets/updateForm.css";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

export default () => {
  const { auth, setAuth } = useAuth();
  const notRef = useRef();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [message, setMessage] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [deleteFocus, setDeleteFocus] = useState(false);
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

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosPrivate.delete(`/users/${auth?.user?.uuid}`);
      setAuth({});
      navigate("/login", {
        state: { message: response?.data?.message },
        replace: true,
      });
    } catch (err) {
      !err?.response
        ? setMessage({ err: true, content: "Server not found" })
        : setMessage({ err: true, content: err.response.data.message });
      setTimeout(() => {
        notRef.current.focus();
      }, 10);
    }
  };

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
          <FontAwesomeIcon
            icon={faLock}
            size="xl"
            className="pwdIcon"
            onClick={() => navigate("password")}
          />
        </div>
      </div>
      <div className="row">
        <div className="other-column">
          <FontAwesomeIcon
            icon={faUserMinus}
            size="xl"
            className="deleteUserIcon"
            onClick={(e) => {
              e.preventDefault();
              setDeleteFocus((prev) => !prev);
            }}
            aria-describedby="deleteButtons"
          />
        </div>
      </div>
      <div className={deleteFocus ? "row" : "offscreen"}>
        <div className="buttons-column">
          <div className="main-button">
            <button type="button" style={{ backgroundColor: "red" }}>
              <FontAwesomeIcon
                icon={faCheck}
                className="btnUserDelete"
                onClick={handleDelete}
              />
            </button>
          </div>
          <div className="other-button">
            <button type="button">
              <FontAwesomeIcon
                icon={faTimes}
                className="btnCancelDelete"
                onClick={(e) => {
                  e.preventDefault();
                  setDeleteFocus(false);
                }}
              />
            </button>
          </div>
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
