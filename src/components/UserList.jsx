import React from "react";
import LineUser from "./LineUser";

export default ({ users }) => {
  return (
    <ul>
      {users.map((user) => (
        <LineUser key={user.uuid} user={user} />
      ))}
    </ul>
  );
};
