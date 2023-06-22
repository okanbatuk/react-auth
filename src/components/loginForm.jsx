import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../libs/api";
import useAuth from "../hooks/useAuth";

export default ({ setErr, errRef }) => {
  const { setAuth } = useAuth();
  const userRef = useRef();
  const navigate = useNavigate();

  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    (email || password) && setErr("");
  }, [email, password]);

  const login = async (email, password) => {
    try {
      const { data } = await api.post("/login", email, password, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      const { user, accessToken } = data?.data;
      setAuth({
        uuid: user.uuid,
        email: user.email,
        roles: user.role,
        accessToken,
      });
      setEmail("");
      setPassword("");
      navigate(from, { replace: true });
    } catch (err) {
      !err?.response
        ? setErr("There is No Server Response")
        : setErr(err.response.data.message);
      errRef.current.focus();
    } finally {
      setEmail("");
      setPassword("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    email && password && login({ email, password });
  };

  return (
    <form>
      <label htmlFor="email">Email:</label>
      <input
        id="email"
        type="text"
        ref={userRef}
        autoComplete="off"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
      <button type="submit" onClick={handleSubmit}>
        Sign In
      </button>
    </form>
  );
};
