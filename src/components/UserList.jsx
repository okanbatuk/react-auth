import React from "react";
import LineUser from "./LineUser";

export default ({ users }) => {
  return (
    <ul>
      {users.map((user, index) => (
        <LineUser key={index} user={user} />
      ))}
    </ul>
  );
};
