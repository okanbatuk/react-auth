import React, { useState, useEffect, useRef } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "../libs/api";

const NAME_REGEX = /^[A-z][A-z ]{2,23}$/;
const MAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{6,24}$/;
const REGISTER_URL = "/register";

export default ({ setSuccess, setError, errRef }) => {
  const nameRef = useRef();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [matchPass, setMatchPass] = useState("");

  // For regex
  const [validName, setValidName] = useState(false);
  const [validSurname, setValidSurname] = useState(false);
  const [validMail, setValidMail] = useState(false);
  const [validPass, setValidPass] = useState(false);
  const [validMatch, setValidMatch] = useState(false);

  // For Instructions
  const [nameFocus, setNameFocus] = useState(false);
  const [surnameFocus, setSurnameFocus] = useState(false);
  const [mailFocus, setMailFocus] = useState(false);
  const [passFocus, setPassFocus] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(NAME_REGEX.test(firstName));
    setValidSurname(NAME_REGEX.test(lastName));
    setValidMail(MAIL_REGEX.test(email));
  }, [firstName, lastName, email]);

  useEffect(() => {
    const result = PWD_REGEX.test(password);
    setValidPass(result);

    setValidMatch(password === matchPass);
  }, [password, matchPass]);

  useEffect(() => {
    firstName || lastName || email || password || matchPass || setError("");
  }, [firstName, lastName, email, password, matchPass]);

  const register = async (userInfo) => {
    try {
      const response = await api.post(REGISTER_URL, userInfo, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      setSuccess(true);
    } catch (err) {
      !err?.response
        ? setError("There is No Server Response")
        : setError(err.response.data.message);
      errRef.current.focus();
    } finally {
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setMatchPass("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validName && validSurname && validMail && validPass && validMatch
      ? register({ firstName, lastName, email, password })
      : (setError("Invalid Entry"), errRef.current.focus());
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
        onChange={(e) => {
          e.target.value.length < 24 && setFirstName(e.target.value);
        }}
        required
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
        onChange={(e) => {
          e.target.value.length < 24 && setLastName(e.target.value);
        }}
        required
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
        onChange={(e) => setEmail(e.target.value)}
        required
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

      {/* Password Section */}
      <label htmlFor="password">
        Password:
        <FontAwesomeIcon
          icon={faCheck}
          className={validPass ? "valid" : "hide"}
        />
        <FontAwesomeIcon
          icon={faTimes}
          className={validPass || !password ? "hide" : "invalid"}
        />
      </label>
      <input
        type="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        required
        aria-invalid={validPass ? "false" : "true"}
        aria-describedby="pwdnote"
        onFocus={() => setPassFocus(true)}
        onBlur={() => setPassFocus(false)}
      />
      <p
        id="pwdnote"
        className={passFocus && !validPass ? "instructions" : "offscreen"}
      >
        <FontAwesomeIcon icon={faInfoCircle} />
        6 to 24 characters.
        <br />
        Must include uppercase and lowercase letters, a number and a special
        character.
        <br />
        Allowed special characters:
        <span aria-label="exclamation mark"> ! </span>
        <span aria-label="at symbol">@ </span>
        <span aria-label="hashtag"># </span>
        <span aria-label="dollar sign">$ </span>
        <span aria-label="percent">%</span>
      </p>

      {/* Confirm Password Section */}
      <label htmlFor="confirm_pwd">
        Confirm Password:
        <FontAwesomeIcon
          icon={faCheck}
          className={validMatch && matchPass ? "valid" : "hide"}
        />
        <FontAwesomeIcon
          icon={faTimes}
          className={validMatch || !matchPass ? "hide" : "invalid"}
        />
      </label>
      <input
        type="password"
        id="confirm_pwd"
        onChange={(e) => setMatchPass(e.target.value)}
        value={matchPass}
        required
        aria-invalid={validMatch ? "false" : "true"}
        aria-describedby="confirmnote"
        onFocus={() => setMatchFocus(true)}
        onBlur={() => setMatchFocus(false)}
      />
      <p
        id="confirmnote"
        className={matchFocus && !validMatch ? "instructions" : "offscreen"}
      >
        <FontAwesomeIcon icon={faInfoCircle} />
        Must match the first password input field.
      </p>

      <button disabled={validMail && validPass && validMatch ? false : true}>
        Sign Up
      </button>
    </form>
  );
};
