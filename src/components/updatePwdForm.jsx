import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{6,24}$/;

export default ({ setMessage, notRef }) => {
  const currRef = useRef();
  const navigate = useNavigate();
  const [currPassword, setCurrPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [matchPass, setMatchPass] = useState("");

  const [validPass, setValidPass] = useState(false);
  const [validMatch, setValidMatch] = useState(false);

  const [currPassFocus, setCurrPassFocus] = useState(false);
  const [passFocus, setPassFocus] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  useEffect(() => {
    const result = PWD_REGEX.test(newPassword);
    setValidPass(result);

    setValidMatch(newPassword === matchPass);
  }, [newPassword, matchPass]);

  useEffect(() => {
    (currPassword || newPassword || matchPass) && setMessage(null);
  }, [currPassword, newPassword, matchPass]);

  const updatePwd = () => {
    console.log("object");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    currPassword && newPassword && matchPass
      ? updatePwd()
      : (setMessage({ err: true, content: "Invalid Entry" }),
        notRef.current.focus());
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* First Name Section */}
      <label htmlFor="currPassword">Current Password:</label>
      <input
        id="currPassword"
        type="password"
        required
        ref={currRef}
        autoComplete="off"
        value={currPassword}
        onChange={(e) =>
          e.target.value.length < 24 && setCurrPassword(e.target.value)
        }
        aria-invalid="true"
        aria-describedby="currPwdNote"
        onFocus={() => setCurrPassFocus(true)}
        onBlur={() => setCurrPassFocus(false)}
      />
      <p
        id="currPwdNote"
        className={currPassFocus ? "instructions" : "offscreen"}
      >
        <FontAwesomeIcon icon={faInfoCircle} />
        Enter your current password
      </p>

      {/* Password Section */}
      <label htmlFor="newPassword">
        Password:
        <FontAwesomeIcon
          icon={faCheck}
          className={validPass ? "valid" : "hide"}
        />
        <FontAwesomeIcon
          icon={faTimes}
          className={validPass || !newPassword ? "hide" : "invalid"}
        />
      </label>
      <input
        type="password"
        id="newPassword"
        required
        value={newPassword}
        onChange={(e) =>
          e.target.value.length < 24 && setNewPassword(e.target.value)
        }
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
        required
        onChange={(e) =>
          e.target.value.length < 24 && setMatchPass(e.target.value)
        }
        value={matchPass}
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

      <div className="buttons">
        <button
          className="btnSave"
          type="submit"
          disabled={validPass && validMatch ? false : true}
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
