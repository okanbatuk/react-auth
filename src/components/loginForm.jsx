import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../libs/api";
import useAuth from "../hooks/useAuth";
import useInput from "../hooks/useInput";
import useToggle from "../hooks/useToggle";

export default ({ setErr, errRef }) => {
  const { setAuth } = useAuth();
  const userRef = useRef();
  const navigate = useNavigate();

  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [email, resetEmail, emailAtt] = useInput("loginEmail", "", 35);
  const [password, setPassword] = useState("");
  const [toggleAtt] = useToggle("persist");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    (email || password) && setErr("");
  }, [email, password]);

  const login = async () => {
    try {
      const { data } = await api.post(
        "/login",
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const { user, accessToken } = data?.data;
      setAuth({
        user: {
          uuid: user.uuid,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          roles: user.role,
        },
        accessToken,
      });
      resetEmail();
      setPassword("");
      navigate(
        from,
        { state: { message: "You're logged in!" } },
        { replace: true }
      );
    } catch (err) {
      !err?.response
        ? setErr("There is No Server Response")
        : setErr(err.response.data.message);
      errRef.current.focus();
    } finally {
      resetEmail();
      setPassword("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    email && password
      ? login()
      : (setErr("Invalid Entry.."), errRef.current.focus());
  };

  return (
    <form>
      <label htmlFor="email">Email:</label>
      <input
        id="email"
        type="text"
        ref={userRef}
        autoComplete="off"
        {...emailAtt}
        required
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button
        type="submit"
        disabled={email && password ? false : true}
        onClick={handleSubmit}
      >
        Sign In
      </button>
      <div className="persistCheck">
        <input type="checkbox" id="persist" {...toggleAtt} />
        <label htmlFor="persist">Trust This Device</label>
      </div>
    </form>
  );
};
