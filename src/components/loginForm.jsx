import React, { useState, useRef, useEffect, useContext } from "react";
import AuthContext from "../context/AuthProvider";
import api from "../libs/api";
import { useNavigate } from "react-router-dom";

export default ({ setSuccess, setErr, errRef }) => {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const navigate = useNavigate();

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
        email: user.email,
        roles: user.role,
        accessToken,
      });
      setSuccess(true);
      navigate("/");
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
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Sign In</button>
    </form>
  );
};
