import React, { useState, useEffect } from "react";
import Feed from "../components/Feed";
import useFetchPrivate from "../hooks/useFetchPrivate";

export default () => {
  const { data, loading, error } = useFetchPrivate("/users");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const userList = data?.data?.users.map(
      (user) => `${user.firstName} ${user.lastName} - ${user.role}`
    );
    setUsers(userList);
  }, [data]);

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
        <Feed users={users} />
      )}
    </article>
  );
};
