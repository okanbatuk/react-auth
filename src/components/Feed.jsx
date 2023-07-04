import React, { useState, useEffect } from "react";
import UserList from "./UserList";

export default ({ data }) => {
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
