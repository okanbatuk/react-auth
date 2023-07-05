import React from "react";
import UserList from "./UserList";

export default ({ users }) => {
  return (
    <>
      {users?.length ? (
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
