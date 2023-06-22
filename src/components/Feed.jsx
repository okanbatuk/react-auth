import React, { useState, useEffect } from "react";
import UserList from "./UserList";
import useFetch from "../hooks/useFetch";
import useAuth from "../hooks/useAuth";

export default () => {
  const { auth } = useAuth();
  const { data } = useFetch("/users", auth.accessToken);
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
