import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { omitBy, isEmpty, replace, first } from "lodash";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";

const NAME_REGEX = /^[A-z][A-z ]{2,23}$/;
const MAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default ({ data, setMessage, notRef }) => {
  const nameRef = useRef();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // For regex
  const [validMail, setValidMail] = useState(false);
  const [validName, setValidName] = useState(false);
  const [validSurname, setValidSurname] = useState(false);

  // For Instructions
  const [mailFocus, setMailFocus] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);
  const [surnameFocus, setSurnameFocus] = useState(false);

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  useEffect(() => {
    data?.firstName && setFirstName(data?.firstName);
    data?.lastName && setLastName(data?.lastName);
    data?.email && setEmail(data?.email);
  }, [data]);

  useEffect(() => {
    setValidName(NAME_REGEX.test(firstName));
    setValidSurname(NAME_REGEX.test(lastName));
    setValidMail(MAIL_REGEX.test(email));
  }, [firstName, lastName, email]);

  useEffect(() => {
    (firstName || lastName || email) && setMessage("");
  }, [firstName, lastName, email]);

  const update = async () => {
    const rawValues = [{ firstName, lastName, email }];
    const values = rawValues.map((value) => omitBy(value, isEmpty));
    try {
      const response = await axiosPrivate.post(
        `/users/${auth?.user?.uuid}`,
        values[0],
        { signal: AbortSignal.timeout(2000) }
      );
      setMessage({ err: false, content: response?.data?.message });
      setTimeout(() => {
        window.location.reload(false);
      }, 1000);
    } catch (err) {
      !err?.response
        ? setMessage({ err: true, content: "Server not found" })
        : setMessage({ err: true, content: err.response.data.message });
    } finally {
      notRef.current.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    firstName || lastName || email
      ? update()
      : (setMessage({ err: true, content: "Invalid Entry.." }),
        notRef.current.focus());
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* First Name Section */}
      <label htmlFor="firstName">
        First Name:
        <FontAwesomeIcon
          icon={faCheck}
          className={validName ? "valid" : "hide"}
        />
        <FontAwesomeIcon
          icon={faTimes}
          className={validName || !firstName ? "hide" : "invalid"}
        />
      </label>
      <input
        type="text"
        id="firstName"
        ref={nameRef}
        autoComplete="off"
        value={firstName}
        onChange={(e) =>
          e.target.value.length < 24 && setFirstName(e.target.value)
        }
        aria-invalid={validName ? "false" : "true"}
        aria-describedby="nameNote"
        onFocus={() => setNameFocus(true)}
        onBlur={() => setNameFocus(false)}
      />
      <p
        id="nameNote"
        className={nameFocus && !validName ? "instructions" : "offscreen"}
      >
        <FontAwesomeIcon icon={faInfoCircle} />
        3 to 23 characters.
        <br />
        Must begin with a letter.
      </p>

      {/* Last Name Section */}
      <label htmlFor="lastName">
        Last Name:
        <FontAwesomeIcon
          icon={faCheck}
          className={validSurname ? "valid" : "hide"}
        />
        <FontAwesomeIcon
          icon={faTimes}
          className={validSurname || !lastName ? "hide" : "invalid"}
        />
      </label>
      <input
        type="text"
        id="lastName"
        autoComplete="off"
        value={lastName}
        onChange={(e) =>
          e.target.value.length < 24 && setLastName(e.target.value)
        }
        aria-invalid={validSurname ? "false" : "true"}
        aria-describedby="surnameNote"
        onFocus={() => setSurnameFocus(true)}
        onBlur={() => setSurnameFocus(false)}
      />
      <p
        id="surnameNote"
        className={surnameFocus && !validSurname ? "instructions" : "offscreen"}
      >
        <FontAwesomeIcon icon={faInfoCircle} />
        3 to 23 characters.
        <br />
        Must begin with a letter.
      </p>

      {/* Email Section */}
      <label htmlFor="email">
        Email:
        <FontAwesomeIcon
          icon={faCheck}
          className={validMail ? "valid" : "hide"}
        />
        <FontAwesomeIcon
          icon={faTimes}
          className={validMail || !email ? "hide" : "invalid"}
        />
      </label>
      <input
        type="text"
        id="email"
        autoComplete="off"
        value={email}
        onChange={(e) => e.target.value.length < 35 && setEmail(e.target.value)}
        aria-invalid={validMail ? "false" : "true"}
        aria-describedby="uidnote"
        onFocus={() => setMailFocus(true)}
        onBlur={() => setMailFocus(false)}
      />
      <p
        id="uidnote"
        className={mailFocus && !validMail ? "instructions" : "offscreen"}
      >
        <FontAwesomeIcon icon={faInfoCircle} />
        Must be a valid email.
      </p>

      <div className="buttons">
        <button
          className="btnSave"
          type="submit"
          disabled={validName || validSurname || validMail ? false : true}
        >
          Save
        </button>
        <button
          className="btnCancel"
          type="button"
          onClick={() => navigate("/", { replace: true })}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
