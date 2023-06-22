import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import Feed from "../components/Feed";

export default () => {
  const { loading, error } = useFetch("/users");

  return (
    <article>
      <h2>Users List</h2>
      {error ? (
        <p
          style={{
            display: "flex",
            justifyContent: "center",
            color: "red",
            fontSize: "1rem",
          }}
        >
          Error: {error}
        </p>
      ) : loading ? (
        <p
          style={{
            display: "flex",
            justifyContent: "center",
            fontStyle: "italic",
            fontSize: "1rem",
          }}
        >
          Loading..
        </p>
      ) : (
        <Feed />
      )}
    </article>
  );
};
