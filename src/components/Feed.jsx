import React, { useState, useEffect } from "react";
import UserList from "./UserList";
import useFetchPrivate from "../hooks/useFetchPrivate";

export default () => {
  const { data } = useFetchPrivate("/users");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(data);
  }, [data]);

  return (
    <>
      {users.length ? (
        <UserList users={users} />
      ) : (
        <p
          style={{
            display: "flex",
            justifyContent: "center",
            fontStyle: "italic",
            fontSize: "1rem",
          }}
        >
          There is no users to display
        </p>
      )}
    </>
  );
};
